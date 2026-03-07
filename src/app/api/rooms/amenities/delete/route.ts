import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const removedAmenitie = await prisma.amenitie.delete({
      where: { id },
      include: {
        rooms: true,
      },
    });
    return NextResponse.json(
      { ok: true, message: "Eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
