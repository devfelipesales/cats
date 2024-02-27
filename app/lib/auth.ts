import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismaClient } from "./prisma";
import { compare } from "bcrypt";
import { DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export type TUser = DefaultUser & {
  profile: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // name: "Sign-in2",
      credentials: {
        user: { label: "Usuario / Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.user || !credentials?.password) {
          return null;
        }
        const user = await prismaClient.user.findFirst({
          where: {
            OR: [
              {
                email: {
                  equals: credentials.user,
                },
              },
              { profile: { equals: credentials.user } },
            ],
          },
        });

        if (
          !user ||
          !(await compare(credentials.password, user.password as string))
        ) {
          return null;
        }

        return {
          id: user.id,
          profile: user.profile,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          profile: token.profile as string,
        } as TUser,
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          profile: u.profile,
        };
      }
      return token;
    },
  },
};
