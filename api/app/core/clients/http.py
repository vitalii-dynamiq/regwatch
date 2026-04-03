import json
from typing import Any, TypeVar

import httpx
from httpx import Response
from httpx._types import URLTypes
from pydantic import TypeAdapter, ValidationError

from app.core.loggers import logger


class HttpBaseError(Exception):
    pass


class DataParsingError(HttpBaseError):
    pass


class HttpConnectionError(HttpBaseError):
    pass


class HttpServerError(HttpBaseError):
    pass


class HttpClientError(HttpBaseError):
    pass


ModelType = TypeVar("ModelType")


class HttpClient:
    def __init__(self, base_url: str | None = None, **kwargs: Any):
        self.base_url = base_url
        self.client = httpx.AsyncClient(**kwargs)  # nosec

    async def request(self, method: str, url_path: URLTypes, **kwargs: Any) -> Response:
        logger.debug(f'[{self.__class__.__name__}] REQ "{method} {url_path}". Kwargs: {kwargs}')
        url = f"{self.base_url}/{str(url_path).lstrip('/')}" if self.base_url else str(url_path).lstrip("/")
        try:
            response = await self.client.request(method, url=url, **kwargs)
        except (httpx.TimeoutException, httpx.NetworkError) as e:
            raise HttpConnectionError(e) from e

        try:
            response.raise_for_status()
        except httpx.HTTPError as e:
            if httpx.codes.is_client_error(response.status_code):
                raise HttpClientError(e, response) from e
            else:
                raise HttpServerError(e, response) from e

        return response

    async def request_json(self, method: str, url_path: URLTypes, **kwargs: Any) -> tuple[Any, int]:
        kwargs["headers"] = kwargs.get("headers", {})
        kwargs["headers"]["Content-Type"] = "application/json"
        response = await self.request(method, url_path, **kwargs)

        try:
            data = response.json()
        except (TypeError, json.JSONDecodeError) as e:
            logger.error(f'Response "{method} {url_path}" {response.status_code}. Parsing error: {e}')
            raise DataParsingError(e, response) from e

        return data, response.status_code

    @staticmethod
    def parse_data_as(type_: type[ModelType], data: Any) -> ModelType:
        try:
            return TypeAdapter(type_).validate_python(data)
        except ValidationError as e:
            raise DataParsingError(e, data) from e

    @staticmethod
    def parse_data_json_as(type_: type[ModelType], data: str) -> ModelType:
        try:
            return TypeAdapter(type_).validate_json(data)
        except ValidationError as e:
            raise DataParsingError(e, data) from e

    async def close(self):
        await self.client.aclose()
