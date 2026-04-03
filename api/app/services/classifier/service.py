from dynamiq import connections
from dynamiq.nodes.llms import TogetherAI
from dynamiq.prompts import Message, Prompt
from pydantic import BaseModel, ConfigDict, Field, PrivateAttr, ValidationError

from app.core.loggers import logger
from app.db.pg.models.sources import ContentType

from .exceptions import ClassificationError, LLMConnectionError, LLMResponseError, ObligationExtractionError
from .models import ContentTruncationInfo, LLMClassificationResponse, LLMExtractionObligationAlertResponse
from .prompts import get_classification_prompt, get_obligation_alert_extraction_prompt
from .settings import ClassifierConfig


class ClassifierService(BaseModel):
    """Service for classifying content and extracting regulatory obligations.

    Implemented as a Pydantic model for consistency with `CrawlerService`.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, validate_assignment=True)

    config: ClassifierConfig = Field(default_factory=ClassifierConfig.from_settings)

    _connection_factory = PrivateAttr(default=connections.TogetherAI)

    def model_post_init(self, __context: dict | None) -> None:  # type: ignore[override]
        # Nothing to eagerly initialize; connection created per request
        return None

    async def classify_content(
        self,
        content: str,
        content_types: list[ContentType | str] | None = None,
    ) -> LLMClassificationResponse:
        """Classify content as regulatory or non-regulatory."""
        try:
            logger.debug(f"Starting classification for {len(content)} characters")
            content_to_process, _ = self._truncate_content(content)

            result = await self._get_classification_from_llm(content=content_to_process, content_types=content_types)

            logger.info(
                f"Classification completed: regulatory={result.is_regulatory}, "
                f"confidence={result.confidence:.2f}, "
                f"categories={result.categories}"
            )

            return result

        except Exception as e:
            logger.error(f"Classification failed: {e}")
            raise ClassificationError(f"Failed to classify content: {str(e)}") from e

    async def extract_alerts(
        self, content: str, content_types: list[ContentType | str] | None = None
    ) -> LLMExtractionObligationAlertResponse:
        """Extract regulatory alerts from content."""
        try:
            logger.debug(f"Starting obligation alert esxtraction for {len(content)} characters")

            content_to_process, _ = self._truncate_content(content)
            result = await self._get_obligation_alerts_from_llm(content=content_to_process)
            result.obligations = [item for item in result.obligations if item.category in content_types]

            logger.info(
                f"Obligation alert extraction completed: "
                f"found={not result.no_obligations_found}, "
                f"count={len(result.obligations)}"
            )
            return result

        except Exception as e:
            logger.error(f"Obligation extraction failed: {e}")
            raise ObligationExtractionError(f"Failed to extract obligations: {str(e)}") from e

    def _truncate_content(self, content: str) -> tuple[str, ContentTruncationInfo]:
        """Truncate content if it exceeds maximum length."""
        max_chars = self.config.max_content_chars
        original_length = len(content)

        if original_length <= max_chars:
            return content, ContentTruncationInfo(
                was_truncated=False,
                original_length=original_length,
                truncated_length=original_length,
                max_allowed_length=max_chars,
            )

        # Take first and last parts for context
        first_part = content[: max_chars // 2]
        last_part = content[-max_chars // 2 :]
        truncated_content = f"{first_part}\n\n[... CONTENT TRUNCATED ...]\n\n{last_part}"

        logger.warning(f"Content truncated from {original_length} to {len(truncated_content)} characters")

        return truncated_content, ContentTruncationInfo(
            was_truncated=True,
            original_length=original_length,
            truncated_length=len(truncated_content),
            max_allowed_length=max_chars,
        )

    async def _get_classification_from_llm(
        self,
        content: str,
        content_types: list[ContentType | str] | None = None,
    ) -> LLMClassificationResponse:
        """Get classification result from LLM."""
        try:
            connection = self._connection_factory(api_key=self.config.api_key)

            prompt = get_classification_prompt(content_types=content_types)
            response_schema = LLMClassificationResponse.model_json_schema()

            response = await TogetherAI(
                model=self.config.model,
                connection=connection,
                prompt=Prompt(
                    messages=[
                        Message(role="system", content=prompt),
                        Message(role="user", content=content, static=True),
                    ],
                ),
                max_tokens=self.config.max_tokens,
                response_format={
                    "type": "json_schema",
                    "json_schema": {
                        "strict": True,
                        "schema": response_schema,
                    },
                },
                temperature=self.config.temperature,
            ).run(input_data={})

            # Parse and validate response using Pydantic directly
            return self._parse_llm_response(response, LLMClassificationResponse)

        except Exception as e:
            raise LLMConnectionError(f"Failed to get classification from LLM: {str(e)}") from e

    async def _get_obligation_alerts_from_llm(
        self, content: str, content_types: list[ContentType | str] | None = None
    ) -> LLMExtractionObligationAlertResponse:
        """Get obligation alert extraction result from LLM."""
        try:
            connection = self._connection_factory(api_key=self.config.api_key)
            prompt = get_obligation_alert_extraction_prompt(content_types=content_types)
            response_schema = LLMExtractionObligationAlertResponse.model_json_schema()

            response = await TogetherAI(
                model=self.config.model,
                connection=connection,
                prompt=Prompt(
                    messages=[
                        Message(role="system", content=prompt),
                        Message(role="user", content=content, static=True),
                    ],
                ),
                max_tokens=self.config.max_tokens,
                response_format={
                    "type": "json_schema",
                    "json_schema": {
                        "strict": True,
                        "schema": response_schema,
                    },
                },
                temperature=self.config.extraction_temperature,
            ).run(input_data={})

            return self._parse_llm_response(response, LLMExtractionObligationAlertResponse)

        except Exception as e:
            raise LLMConnectionError(f"Failed to get obligations from LLM: {str(e)}") from e

    def _parse_llm_response(self, response, model_class):
        """Parse LLM response using Pydantic model validation.

        Args:
            response: Raw response from LLM
            model_class: Pydantic model class to validate against

        Returns:
            Validated Pydantic model instance

        Raises:
            LLMResponseError: If response is invalid or validation fails
        """
        if response is None:
            raise LLMResponseError("Response is None")

        if not hasattr(response, "output"):
            raise LLMResponseError(f"Response has no 'output' attribute: {dir(response)}")

        if response.output is None:
            raise LLMResponseError("Response.output is None")

        raw_content = response.output.get("content", "")
        if not raw_content:
            raise LLMResponseError("Empty content in response")

        try:
            return model_class.model_validate_json(raw_content)
        except ValidationError as e:
            logger.debug(f"Direct JSON parsing failed: {e}")

            cleaned_content = raw_content.replace("```json", "").replace("```", "").strip()

            try:
                return model_class.model_validate_json(cleaned_content)
            except ValidationError as e:
                logger.debug(f"Cleaned JSON parsing failed: {e}")

                # Last resort: try removing potential extra braces
                while cleaned_content.startswith("{\n  {"):
                    cleaned_content = cleaned_content[3:]
                while cleaned_content.endswith("}\n}"):
                    cleaned_content = cleaned_content[:-2]

                try:
                    return model_class.model_validate_json(cleaned_content)
                except ValidationError as final_error:
                    logger.error(f"All parsing attempts failed. Raw content: {raw_content[:500]}...")
                    raise LLMResponseError(
                        f"Failed to parse LLM response with {model_class.__name__}: {final_error}"
                    ) from final_error

    async def aclose(self) -> None:
        # Nothing currently to close; added for API parity with crawler service
        return None

    async def __aenter__(self) -> "ClassifierService":
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        await self.aclose()
