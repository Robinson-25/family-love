import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        roomtype: true,
        hotelcenter: true,
        images: true,
        amenities: true,
      },
    });

    return NextResponse.json({ ok: true, rooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
