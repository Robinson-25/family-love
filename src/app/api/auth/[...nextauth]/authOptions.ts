import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            image: true,
          },
        });

        if (user) {
          //if (!user.emailVerified) {
           // throw new Error("Cuenta no verificada");
        //  }
          const passwordMatches = await bcrypt.compare(
            credentials?.password as string,
            user?.password
          );

          if (passwordMatches) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.role,
              image: user?.image?.url,
            };
          } else {
            throw new Error("La contraseña es incorrecta");
          }
        } else {
          throw new Error("El usuario no existe");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          const baseUsername = user.email!.split("@")[0];

          const usernameExists = await prisma.user.findUnique({
            where: { username: baseUsername },
          });

          const username = usernameExists
            ? `${baseUsername}${Math.floor(Math.random() * 9999)}`
            : baseUsername;

          await prisma.user.create({
            data: {
              email: user.email!,
              username,
              emailVerified: new Date(),
              password: "",
              role: "customer",  // ✅ CORREGIDO: era "USER", ahora es "customer"
            },
          });
        }
      }
      return true;
    },

    async session({ session, token }) {
      const data = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        include: {
          image: true,
        },
      });

      token.role = data?.role;
      session.user.role = data?.role;
      session.user.image = data?.image?.url;
      session.user.id = data?.id;

      return session;
    },
  },
};


