import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcrypt";

interface Payload {
  sub: string;
  iat: number;
  exp: number;
}

export async function POST(req: NextRequest) {
  const { id, newPassword } = await req.json();

  try {
    const passwordHashed = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: passwordHashed,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Contraseña actualizada correctamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
