import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name } = await req.json();

  try {
    const roomTypeExists = await prisma.roomtype.findUnique({
      where: {
        name,
      },
    });

    if (roomTypeExists) {
      return NextResponse.json({ error: "La categoría ya existe" });
    }

    const roomType = await prisma.roomtype.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Categoría creada correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
