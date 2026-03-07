import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { roomId, checkIn, checkOut } = await req.json();

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        bookings: true,
        amenities: true,
        roomtype: true,
        images: true,
      },
    });

    if (roomIsAvailable({ room: room as Room, checkIn, checkOut })) {
      return NextResponse.json({
        ok: true,
        message:
          "La habitación está disponible para las fechas elegidas, puedes reservarla",
      });
    } else {
      return NextResponse.json({
        error:
          "La habitación ya está reservada para las fechas elegidas, por favor elige otras fechas",
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
