import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, name } = await req.json();

  try {
    const amenitie = await prisma.amenitie.findUnique({
      where: { id },
    });

    if (amenitie?.name === name) {
      return NextResponse.json(
        { ok: true, message: "Actualizado exitosamente" },
        { status: 200 }
      );
    }
    const amenitieExists = await prisma.amenitie.findUnique({
      where: { name },
    });
    if (amenitieExists) {
      return NextResponse.json({ error: "Este nombre ya existe" });
    }

    const updatedAmenitie = await prisma.amenitie.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Actualizado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
