import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, name } = await req.json();

  try {
    const roomType = await prisma.roomtype.findUnique({
      where: { id },
    });
    if (roomType?.name === name) {
      return NextResponse.json(
        { ok: true, message: "Actualizado exitosamente" },
        { status: 200 }
      );
    }
    const roomTypeExists = await prisma.roomtype.findUnique({
      where: {
        name,
      },
    });

    if (roomTypeExists) {
      return NextResponse.json({ error: "Este nombre ya existe" });
    }

    const updatedRoomType = await prisma.roomtype.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ ok: true, message: "Actualizado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
