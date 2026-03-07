import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  try {
    const amenitieExists = await prisma.amenitie.findUnique({
      where: {
        name,
      },
    });

    if (amenitieExists) {
      return NextResponse.json({ error: "Este nombre ya existe" });
    }

    const amenitie = await prisma.amenitie.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "La comodidad se creó exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
