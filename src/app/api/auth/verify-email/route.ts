import { prisma } from "@/lib/prisma";

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
        const user = await prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        });

        if (!user) {
          return NextResponse.json({ error: "El usuario no existe" });
        }
        const updatedUser = await prisma.user.update({
          where: {
            id: payload.sub,
          },
          data: {
            emailVerified: new Date(),
          },
        });
        return NextResponse.json({ ok: true }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
