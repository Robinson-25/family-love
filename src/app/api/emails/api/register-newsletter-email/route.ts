import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  try {
    const emailExists = await prisma.newsletterEmail.findUnique({
      where: { email },
    });

    if (emailExists) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    const newsletterEmail = await prisma.newsletterEmail.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Email registrado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
