
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import type { Provider } from "next-auth/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          emailVerified: profile.email_verified,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        return { ...credentials };
      },
    }),
  ],
});

