import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const roomType = await prisma.roomtype.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({ ok: true, roomType }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
