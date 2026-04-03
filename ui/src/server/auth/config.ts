import { SIGNIN_PAGE } from '@/lib/constants/common';
import type { UserCreateDto } from '@/server/api/entity/user/types';
import { isValidToken } from '@/server/auth/isValidToken';
import type { DefaultSession, NextAuthConfig } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
    accessToken?: string;
    accessTokenExpires?: number; // epoch ms
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// @ts-ignore
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number; // epoch ms
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Auth0Provider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: SIGNIN_PAGE,
  },
  callbacks: {
    async signIn(props) {
      const { user, account } = props;

      const [firstName = '', lastName = ''] = (user.name ?? '').split(' ');
      const createUserDto: UserCreateDto = {
        email: user.email as UserCreateDto['email'],
        first_name: firstName as UserCreateDto['first_name'],
        last_name: lastName as UserCreateDto['last_name'],
      };

      if (account && account.provider === 'auth0' && account.id_token) {
        try {
          const token = account.id_token;
          // Defer the import to avoid module evaluation cycles and client bundling paths
          const { createUserWithSignIn } = await import('@/server/api/entity/user/services');
          await createUserWithSignIn(createUserDto, token);
          return true;
        } catch (_error) {
          // console.error('Error creating user:', error);
          // return true because the user is already created in the project database
          return true;
        }
      }
      // return false because the user has not had an access token from auth0
      return false;
    },
    // Persist the OAuth tokens in the JWT right after sign-in
    async jwt(props) {
      const { token, account, profile } = props;

      if (account) {
        // for the current backend part use id_token instead of access_token
        token.accessToken = account.id_token;
        // token.refreshToken = account.refresh_token;
        const MS_IN_SECOND = 1000;
        const ONE_HOUR_MS = 60 * 60 * MS_IN_SECOND;
        // for the current backend part use profile.exp instead of account.expires_at
        const expSeconds = typeof profile?.exp === 'number' ? profile.exp : undefined;
        token.accessTokenExpires = expSeconds ? expSeconds * MS_IN_SECOND : Date.now() + ONE_HOUR_MS;
      }

      // If token is present, return it. Do NOT redirect from here.
      return token;
    },
    session: ({ session, token }) => {
      // Ensure we always return a Session object (not null) to satisfy typing
      const safeUserId = typeof token.sub === 'string' && token.sub.length > 0 ? token.sub : session.user.id;

      const userWithSafeId = {
        ...session.user,
        id: safeUserId,
      };

      const isValid = isValidToken({
        accessToken: String(token.accessToken),
        accessTokenExpires: Number(token.accessTokenExpires),
      });

      const tokenProps = !isValid
        ? {
            // Return a session without token fields; downstream code can treat it as unauthenticated
            accessToken: undefined,
            accessTokenExpires: undefined,
          }
        : {
            accessToken: String(token.accessToken),
            accessTokenExpires: Number(token.accessTokenExpires),
          };

      return {
        ...session,
        user: userWithSafeId,
        ...tokenProps,
      };
    },
  },
} satisfies NextAuthConfig;
