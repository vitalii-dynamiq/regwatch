import logging

import jwt

from app.core.clients.http import HttpClient
from app.core.exceptions import RespondWith401Unauthorized
from app.core.settings import settings

logger = logging.getLogger(__name__)


class Auth0Client(HttpClient):

    async def get_jwks(self):
        result, code = await self.request_json("GET", ".well-known/jwks.json")
        return result

    async def verify_jwt(self, token: str) -> dict:
        try:
            jwks = await self.get_jwks()
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
            public_key = None
            for jwk_data in jwks.get("keys", []):
                if kid and jwk_data.get("kid") == kid:
                    # Construct a PyJWK from the JWK dictionary
                    public_key = jwt.PyJWK.from_dict(jwk_data).key
                    break

            if public_key:
                payload = jwt.decode(
                    token,
                    public_key,
                    algorithms=settings.AUTH0_ALGORITHMS,
                    audience=(settings.AUTH0_AUDIENCE, settings.AUTH0_API_AUDIENCE),
                    issuer=f"https://{settings.AUTH0_DOMAIN}/",
                )
                return payload
            else:
                raise RespondWith401Unauthorized(message="Invalid authorization token")
        except Exception as e:
            logger.error(f"Failed to verify JWT token. Error: {e}")
            raise RespondWith401Unauthorized(message="Invalid authorization token")
