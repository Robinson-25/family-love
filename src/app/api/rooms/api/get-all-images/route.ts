import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });
    return NextResponse.json({ ok: true, room }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
