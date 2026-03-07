import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rooms = (await req.json()) as {
    room: Room;
    checkIn: string;
    checkOut: string;
  }[];

  try {
    const nonExistingIds: string[] = [];

    if (rooms.length) {
      for (let room of rooms) {
        const roomExists = await prisma.room.findUnique({
          where: { id: room.room.id },
        });

        if (!roomExists) {
          nonExistingIds.push(room.room.id);
        }
      }
    }

    return NextResponse.json({ ok: true, ids: nonExistingIds });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
