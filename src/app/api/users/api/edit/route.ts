import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, username, email, role } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (user?.username !== username) {
      if (usernameExists) {
        return NextResponse.json({ error: "Este nombre de usuario ya existe" });
      }
    } else if (user?.email !== email) {
      if (emailExists) {
        return NextResponse.json({ error: "Este correo ya existe" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data:
        user?.email === email
          ? {
              username,
              email,
              role,
            }
          : {
              username,
              email,
              role,
              emailVerified: null,
            },
    });

    return NextResponse.json({
      ok: true,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
