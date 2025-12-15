import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js"
import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "sqlite" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      roleId: {
        type: "string",
        required: true,
      }
    }
  },
  // socialProviders: {
  //   github: {
  //     clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
  //     clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
  //     redirectURI: "http://localhost:3000/api/auth/callback/github",
  //   },
  // },
  sessions: {
    cookieName: "fx_session",
    cookieSecure: true,
    ttl: 60 * 60 * 24 * 7, // 7 days

  },//30d
  plugins: [nextCookies()],
});

// export type Session = typeof auth.$Infer.Session;
