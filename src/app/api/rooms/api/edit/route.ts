import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    id,
    roomType,
    price,
    adults,
    children,
    roomNumber,
    view,
    bedType,
    amenities,
    target,
    description,
    floor,
    hotelCenterName,
  }: {
    id: string;
    roomType: { id: string; name: string };
    price: string;
    adults: string;
    children: string;
    roomNumber: string;
    view: string;
    bedType: string;
    amenities: { name: string; id: string }[];
    target: string;
    description: string;
    floor: string;
    hotelCenterName: string;
  } = await req.json();

  try {
    const hotelCenter = await prisma.hotelcenter.findUnique({
      where: {
        name: hotelCenterName,
      },
      include: {
        rooms: true,
      },
    });

    if (!hotelCenter) {
      return NextResponse.json({ error: "La sede no existe" });
    }

    const room = await prisma.room.findUnique({
      where: {
        id,
      },
      include: {
        amenities: true,
      },
    });

    if (room?.roomNumber !== parseInt(roomNumber)) {
      const sameRoomNumbers = hotelCenter.rooms.filter(
        (item) => item.roomNumber === parseInt(roomNumber)
      );

      if (sameRoomNumbers.length > 0) {
        return NextResponse.json({
          error: "Ya existe una habitación con este número en esta sede",
        });
      }
    }

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        price: parseInt(price),
        adults: parseInt(adults),
        children: parseInt(children),
        roomNumber: parseInt(roomNumber),
        view,
        bedType,
        amenities: {
          disconnect: room?.amenities.map((amenitie) => ({ id: amenitie.id })),
          connect: amenities.map((amenitie) => ({ id: amenitie.id })),
        },
        roomtype: {
          connect: { id: roomType.id },
        },
        target,
        description,
        floor: parseInt(floor),
        hotelcenter: {
          connect: { id: hotelCenter.id },
        },
      },
    });

    return NextResponse.json(
      { ok: true, message: "Habitación actualizada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
