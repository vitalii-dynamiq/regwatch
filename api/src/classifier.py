"""Content classification module"""

import json
import logging
from typing import Any
import re
from datetime import datetime, timezone

from dynamiq import connections
from dynamiq.prompts import Message, Prompt
from dynamiq.nodes.llms import TogetherAI

from .config import CATEGORIES, settings

logger = logging.getLogger(__name__)


async def classify(content: str) -> dict[str, Any]:
    """Classify content as regulatory or non-regulatory.

    Uses an LLM model to analyze content and determine
    if it contains regulatory information, along with relevant categories.

    Args:
        content: Markdown or text content to classify

    Returns:
        Dictionary containing:
        - is_regulatory: Boolean indicating if content is regulatory
        - confidence: Float between 0-1 indicating classification confidence
        - categories: List of applicable regulatory categories
    """

    # Truncate content if too large (rough token estimation: 1 token ≈ 4 chars)
    max_chars = 120000 * 4  # ~120k tokens to leave room for prompt + response
    if len(content) > max_chars:
        logger.warning(
            f"Content too large ({len(content)} chars), truncating to "
            f"{max_chars} chars"
        )
        # Take first part for context, last part for conclusions
        first_part = content[:max_chars // 2]
        last_part = content[-max_chars // 2:]
        content = f"{first_part}\n\n[... CONTENT TRUNCATED ...]\n\n{last_part}"

    prompt = (
        "You are a senior risk and compliance analyst. "
        "Given the document below, "
        "you need to decide whether this document contains clearly stated "
        "and enforceable regulatory obligations, rules or requirements "
        "for a company. "
        "Document contains regulatory obligations only if you as a "
        "compliance analyst can create a clear set of obligations or rules "
        "a company needs to follow. "
        "Return exactly JSON structure: "
        "{is_regulatory:boolean, confidence:0.0-1.0, categories:list} "
        f"Regulatory categories must be chosen from: {', '.join(CATEGORIES)}. "
        "If the document merely announces future rules or obligations - "
        "it's not regulatory. "
        "Confidence is a subjective probability that such obligations or "
        "rules are present in the document."
        "If confidence is higher than 0.5, it's regulatory. "
        "Your task is to return ONLY the JSON, no other text."
    )
    
    try:
        connection = connections.TogetherAI(
            api_key=settings.together_api_key
        )
        
        logger.debug(f"Sending {len(content)} chars to classifier")
        
        response = await TogetherAI(
            model=settings.classification_model,
            connection=connection,
            prompt=Prompt(
                messages=[
                    Message(
                        role="system",
                        content=prompt,
                    ),
                    Message(
                        role="user",
                        content=content,
                        static=True,
                    ),
                ],
            ),
            max_tokens=128000,
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "is_regulatory": {"type": "boolean"},
                            "confidence": {"type": "number"},
                            "categories": {
                                "type": "array", 
                                "items": {"type": "string"}
                            },
                        },
                        "required": ["is_regulatory", "confidence", "categories"],
                        "additionalProperties": False
                    }
                }
            },
            temperature=0.1,
        ).run(input_data={})
        
        logger.debug(f"Raw response type: {type(response)}")
        logger.debug(f"Raw response: {response}")
        
        # Check if response is None
        if response is None:
            logger.error("Response is None")
            return None  # Return None for errors instead of fake classification
        
        # Check if response has output attribute
        if not hasattr(response, 'output'):
            available_attrs = dir(response)
            logger.error(
                f"Response has no 'output' attribute. "
                f"Available attributes: {available_attrs}"
            )
            return None  # Return None for errors
        
        logger.debug(f"Response.output type: {type(response.output)}")
        logger.debug(f"Response.output: {response.output}")
        
        # Check if output is None
        if response.output is None:
            logger.error("Response.output is None")
            return None  # Return None for errors

        # Try to parse JSON
        try:
            content = (
                response
                .output
                .get("content", "")
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )
            
            # First try parsing as-is (most JSON is valid)
            try:
                result = json.loads(content)
            except json.JSONDecodeError:
                # Only apply minimal cleaning if parsing fails
                logger.debug("Initial JSON parsing failed, applying basic cleaning")
                
                # Basic cleaning - remove extra braces
                while content.startswith("{\n  {"):
                    content = content[3:]
                while content.endswith("}\n}"):
                    content = content[:-2]
                
                # Try parsing again after basic cleaning
                try:
                    result = json.loads(content)
                except json.JSONDecodeError:
                    # Last resort: try to extract just the JSON part
                    logger.debug("Basic cleaning failed, trying JSON extraction")
                    json_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
                    json_match = re.search(json_pattern, content)
                    if json_match:
                        result = json.loads(json_match.group())
                    else:
                        raise  # Re-raise the original error
            
        except Exception as e:
            logger.error(f"Regulatory classification parsing failed: {e}")
            logger.error(f"Response object: {response}")
            return None  # Return None for parsing errors
        
        # Validate and clean result
        if not isinstance(result, dict):
            logger.warning("Result is not a dict, using default")
            return None  # Return None for invalid results
        
        # Ensure required fields exist with proper types
        result.setdefault("is_regulatory", False)
        result.setdefault("confidence", 0.0)
        result.setdefault("categories", [])
        
        # Type conversions
        result["is_regulatory"] = bool(result["is_regulatory"])
        try:
            result["confidence"] = float(result["confidence"])
        except (ValueError, TypeError):
            result["confidence"] = 0.0
        
        if not isinstance(result["categories"], list):
            result["categories"] = []
        
        # Validate categories
        valid_categories = [
            cat for cat in result["categories"] 
            if isinstance(cat, str) and cat in CATEGORIES
        ]
        result["categories"] = valid_categories
        
        logger.info(
            f"Classification result: regulatory={result['is_regulatory']}, "
            f"confidence={result['confidence']:.2f}, "
            f"categories={result['categories']}"
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Classification failed with exception: {e}")
        return None  # Return None for any other errors


async def extract_obligations(content: str) -> dict[str, Any]:
    """Extract structured obligations from regulatory content.

    Uses an LLM model to parse regulatory documents and extract
    specific obligations, requirements, and compliance duties.

    Args:
        content: Markdown or text content to extract obligations from

    Returns:
        Dictionary containing:
        - no_obligations_found: Boolean indicating if obligations were found
        - obligations: List of structured obligation objects
        - extraction_metadata: Metadata about the extraction process
    """
    
    # Truncate content if too large
    max_chars = 120000 * 4  # ~120k tokens to leave room for prompt + response
    if len(content) > max_chars:
        logger.warning(
            f"Content too large ({len(content)} chars), truncating for "
            f"obligation extraction"
        )
        # Take first part for context, last part for conclusions
        first_part = content[:max_chars // 2]
        last_part = content[-max_chars // 2:]
        content = f"{first_part}\n\n[... CONTENT TRUNCATED ...]\n\n{last_part}"

    prompt = (
        "You are a compliance analyst. Extract regulatory obligations "
        "from the document below. "
        "Look for requirements, prohibitions, mandatory actions, "
        "reporting duties, and compliance rules. "
        "Even general requirements should be included. "
        "### ROOT TAXONOMY ###"
        "- Prudential & Risk"
        "- Conduct & Customer Protection"
        "- Payments & Market Infrastructure"
        "- AML / CFT & Sanctions"
        "- Data, Privacy & Cyber-security"
        "- ESG & Sustainability"
        "- Labour & Employment"
        "- Taxation & Social-security"
        "- Health, Safety & Environment"
        "- Corporate Governance & Reporting"
        "- Anti-corruption & Bribery"
        "### INSTRUCTIONS ###"
        "- Find any text that tells organizations what they MUST do, "
        "CANNOT do, or SHOULD report"
        "- Include even high-level requirements"
        "- Set confidence >= 0.5 for any reasonable interpretation"
        "- Return only valid JSON"
        "Extract regulatory obligations from this document. "
        "Find any requirements, rules, or compliance duties. "
        "Return JSON with this exact structure: "
        '{"no_obligations_found": false, "obligations": '
        '[{"obligation_type": "requirement", "requirement_text": "text here", '
        '"english_summary": "summary", "taxonomy_level_0": "Prudential & Risk", '
        '"confidence": 0.8}]} '
        "If no obligations exist, return: "
        '{"no_obligations_found": true, "obligations": []}'
    )
    
    try:
        connection = connections.TogetherAI(
            api_key=settings.together_api_key
        )
        
        logger.debug(f"Extracting obligations from {len(content)} chars")
        
        response = await TogetherAI(
            model=settings.classification_model,
            connection=connection,
            prompt=Prompt(
                messages=[
                    Message(
                        role="system",
                        content=prompt,
                    ),
                    Message(
                        role="user",
                        content=content,
                        static=True,
                    ),
                ],
            ),
            max_tokens=128000,
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "strict": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "no_obligations_found": {"type": "boolean"},
                            "obligations": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "obligation_type": {"type": "string"},
                                        "requirement_text": {"type": "string"},
                                        "english_summary": {"type": "string"},
                                        "taxonomy_level_0": {"type": "string"},
                                        "taxonomy_level_1": {"type": "string"},
                                        "risk_category": {"type": "string"},
                                        "effective_date": {
                                            "type": ["string", "null"]
                                        },
                                        "deadline_date": {
                                            "type": ["string", "null"]
                                        },
                                        "penalty_reference": {
                                            "type": ["string", "null"]
                                        },
                                        "confidence": {"type": "number"},
                                        "update_status": {"type": "string"}
                                    },
                                    "required": [
                                        "obligation_type", "requirement_text",
                                        "english_summary", "taxonomy_level_0",
                                        "confidence", "update_status"
                                    ],
                                    "additionalProperties": False
                                }
                            }
                        },
                        "required": ["no_obligations_found", "obligations"],
                        "additionalProperties": False
                    }
                }
            },
            temperature=0,
        ).run(input_data={})
        
        logger.debug(f"Raw obligation response type: {type(response)}")
        logger.debug(f"Raw obligation response: {response}")
        
        # Check response validity (similar to classify function)
        if response is None or not hasattr(response, 'output'):
            logger.error("Invalid response from obligation extraction")
            return {
                "no_obligations_found": True,
                "obligations": [],
                "extraction_metadata": {"error": "Invalid LLM response"}
            }
        
        if response.output is None:
            logger.error(
                "Response.output is None for obligation extraction"
            )
            return {
                "no_obligations_found": True,
                "obligations": [],
                "extraction_metadata": {"error": "LLM timeout or null response"}
            }

        # Parse JSON response
        try:
            content_str = (
                response
                .output
                .get("content", "")
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )
            
            logger.debug(
                f"Raw obligation content to parse: "
                f"{repr(content_str[:500])}..."
            )
            
            # First try parsing as-is (most JSON is valid)
            try:
                result = json.loads(content_str)
                logger.info(f"Successfully parsed obligation JSON: {result}")
            except json.JSONDecodeError as e:
                logger.error(f"JSON parsing failed: {e}")
                logger.error(f"Error position: line {getattr(e, 'lineno', 'unknown')} column {getattr(e, 'colno', 'unknown')}")
                logger.error(f"Problematic content: {repr(content_str[:500])}...")
                
                # Only apply minimal cleaning if parsing fails
                logger.debug("Applying basic cleaning to obligation JSON")
                
                # Basic cleaning - remove extra braces
                while content_str.startswith("{\n  {"):
                    content_str = content_str[3:]
                while content_str.endswith("}\n}"):
                    content_str = content_str[:-2]
                
                # Try parsing again after basic cleaning
                try:
                    result = json.loads(content_str)
                    logger.info(f"Successfully parsed after cleaning: {result}")
                except json.JSONDecodeError:
                    # Last resort: try to extract just the JSON part
                    logger.debug("Basic cleaning failed, trying JSON extraction")
                    json_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
                    json_match = re.search(json_pattern, content_str)
                    if json_match:
                        json_part = json_match.group()
                        logger.info(f"Attempting to parse extracted JSON: {repr(json_part)}")
                        result = json.loads(json_part)
                        logger.info(f"Successfully parsed extracted JSON: {result}")
                    else:
                        logger.error("No JSON object found in content")
                        result = {
                            "no_obligations_found": True,
                            "obligations": []
                        }
        except Exception as e:
            logger.error(f"Obligation extraction parsing failed: {e}")
            logger.error(f"Failed content: {repr(content_str[:1000])}")
            return {
                "no_obligations_found": True,
                "obligations": [],
                "extraction_metadata": {"error": str(e)}
            }
        
        # Validate result structure
        if not isinstance(result, dict):
            logger.warning("Obligation result is not a dict")
            return {
                "no_obligations_found": True,
                "obligations": [],
                "extraction_metadata": {"error": "Invalid result format"}
            }
        
        # Ensure required fields
        result.setdefault("no_obligations_found", True)
        result.setdefault("obligations", [])
        
        # Add extraction metadata
        result["extraction_metadata"] = {
            "extracted_at": datetime.now(timezone.utc).isoformat(),
            "content_length": len(content),
            "obligations_count": len(result.get("obligations", []))
        }
        
        logger.info(
            f"Extracted {len(result.get('obligations', []))} obligations"
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Obligation extraction failed with exception: {e}")
        return {
            "no_obligations_found": True,
            "obligations": [],
            "extraction_metadata": {"error": str(e)}
        }
