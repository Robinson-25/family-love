import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  try {
    if (token) {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as Payload;

      if (payload) {
        const [rows] = await db.execute(
          "SELECT * FROM User WHERE id = ?",
          [payload.sub]
        ) as any;

        const user = (rows as any[])[0];

        if (!user) {
          return NextResponse.json({ error: "El usuario no existe" });
        }

        await db.execute(
          "UPDATE User SET emailVerified = ? WHERE id = ?",
          [new Date(), payload.sub]
        );

        return NextResponse.json({ ok: true }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}