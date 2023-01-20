import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db";
import { comparePassword } from "../../../utils/password";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user == null || comparePassword(credentials?.password, user.password as string|undefined) == false) {
          return null;
        }

        return user;
      }
    }),
  ],
};

export default NextAuth(authOptions);
