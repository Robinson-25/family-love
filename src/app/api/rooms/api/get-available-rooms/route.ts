import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  hotelCenterId: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
}

export const POST = async (req: NextRequest) => {
  const { hotelCenterId, checkIn, checkOut, adults, children }: Body =
    await req.json();

  try {
    const hotelCenter = await prisma.hotelcenter.findUnique({
      where: { id: hotelCenterId },
      include: {
        rooms: {
          include: {
            bookings: true,
            images: true,
            amenities: true,
            roomtype: true,
            hotelcenter: true,
          },
        },
      },
    });

    const availableRooms: Room[] = [];

    if (hotelCenter?.rooms.length) {
      for (let room of hotelCenter?.rooms) {
        if (roomIsAvailable({ room: room as Room, checkIn, checkOut })) {
          availableRooms.push(room as Room);
        }
      }
    }

    return NextResponse.json(
      { ok: true, rooms: availableRooms },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
