import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rooms = (await req.json()) as {
    room: Room;
    checkIn: string;
    checkOut: string;
  }[];

  for (let room of rooms) {
    const roomDatabase = await prisma.room.findUnique({
      where: { id: room.room.id },
      include: { bookings: true },
    });
    if (
      !roomIsAvailable({
        room: roomDatabase as Room,
        checkIn: new Date(room.checkIn),
        checkOut: new Date(room.checkOut),
      })
    ) {
      return NextResponse.json({
        error: `La ${room.room.roomtype.name} ya no está disponible, puede que la hayas tenido mucho tiempo en el carrito, o simplemente alguien más ya la reservó`,
        room: roomDatabase,
      });
    }
  }

  return NextResponse.json({ ok: true });
};
