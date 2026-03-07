import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const roomTypes = await prisma.roomtype.findMany({
      include: { rooms: true },
    });

    return NextResponse.json({ ok: true, roomTypes });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
