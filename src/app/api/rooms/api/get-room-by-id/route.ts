import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();
  try {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        amenities: true,
        roomtype: true,
        images: true,
        hotelcenter: {
          include: {
            rooms: {
              include: {
                images: true,
                roomtype: true,
                amenities: true,
                hotelcenter: true,
                bookings: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: "La habitación no existe" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, room }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
