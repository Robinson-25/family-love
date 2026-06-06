// @ts-nocheck
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  uri: process.env.DATABASE_URL, // ✅ usa la URL del .env (Clever Cloud)
});

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // ✅ esto arregla el error del secret
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
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const [rows]: any = await db.execute(
          "SELECT u.*, i.url as imageUrl FROM user u LEFT JOIN image i ON i.userId = u.id WHERE u.email = ?",
          [credentials?.email]
        );

        const user = rows[0];

        if (!user) throw new Error("El usuario no existe");

        const passwordMatches = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );

        if (!passwordMatches) throw new Error("La contraseña es incorrecta");

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
          image: user.imageUrl,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const [rows]: any = await db.execute(
          "SELECT * FROM user WHERE email = ?",
          [user.email]
        );

        if (rows.length === 0) {
          const baseUsername = user.email!.split("@")[0];

          const [exists]: any = await db.execute(
            "SELECT * FROM user WHERE username = ?",
            [baseUsername]
          );

          const username =
            exists.length > 0
              ? `${baseUsername}${Math.floor(Math.random() * 9999)}`
              : baseUsername;

          await db.execute(
            "INSERT INTO user (email, username, emailVerified, password, role) VALUES (?, ?, ?, ?, ?)",
            [user.email, username, new Date(), "", "customer"]
          );
        }
      }
      return true;
    },

    async session({ session, token }) {
      const [rows]: any = await db.execute(
        "SELECT u.*, i.url as imageUrl FROM user u LEFT JOIN image i ON i.userId = u.id WHERE u.id = ?",
        [token.sub]
      );

      const data = rows[0];
      if (data) {
        token.role = data.role;
        session.user.role = data.role;
        session.user.image = data.imageUrl;
        session.user.id = data.id;
      }

      return session;
    },
  },
};