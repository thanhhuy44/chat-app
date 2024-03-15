import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import createCustomFetch from "@/utils/client";
import { ApiResponse } from "@/types";

export const Options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile: async (profile, tokens) => {
        console.log("🚀 ~ profile: ~ profile:", profile);
        const fetch = createCustomFetch({
          method: "POST",
        });
        const response: ApiResponse = await fetch("/auth/login-github", {
          fullName: profile?.login,
          email: profile?.email,
          avatar: profile?.avatar_url,
        });

        if (response.statusCode === 200) {
          return {
            id: response.data?._id,
            ...response.data,
          };
        } else {
          throw new Error("Internal Server Error!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const fetch = createCustomFetch({
          method: "POST",
        });
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const response: ApiResponse = await fetch("/auth/login", {
          email,
          password,
        });
        if (response.statusCode === 200) {
          return response.data;
        }
        if (response.statusCode === 404) {
          throw new Error("User not found!");
        }
        if (response.statusCode === 401) {
          throw new Error("Wrong password!");
        }
        throw new Error("Internal Server Error!");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }

      return token;
    },
    async session({ token, session }) {
      session.user = token.user as User;
      return session;
    },
  },
};

export const handler = NextAuth(Options);

export { handler as GET, handler as POST };
