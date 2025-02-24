import { prisma } from "@/app/utils/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       // token.id = user.id;
  //       token.name = user.name;
  //       // token.username = user.username;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       // session.user.id = token.id;
  //       session.user.name = token.name;
  //       // session.user.username = token.username;
  //       session.user.email = token.email;
  //     }
  //     return session;
  //   },
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            name: true,
            email: true,
            password: true,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        return {
          name: user.name,
          email: user.email,
          // password: user.password,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
