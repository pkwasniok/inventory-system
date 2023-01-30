import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/server/db";
import { comparePassword } from "@/server/password";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  secret: 'secreadasdasdasdasdasdasdasdasdasdt',
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

        console.log('User', user);

        if (user == null || comparePassword(credentials?.password, user.password as string|undefined) == false) {
          return null;
        }

        return user;
      }
    }),
  ],
};

export default NextAuth(authOptions);
