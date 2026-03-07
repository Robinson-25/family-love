import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  try {
    const serviceExists = await prisma.service.findUnique({
      where: { name },
    });
    if (serviceExists) {
      return NextResponse.json({ error: "Este servicio ya existe" });
    }

    const service = await prisma.service.create({
      data: {
        name,
      },
    });
    return NextResponse.json(
      { ok: true, message: "Creado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
