import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
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

    if (hotelCenter?.rooms.length) {
      for (let room of hotelCenter?.rooms) {
        if (room.roomNumber === parseInt(roomNumber)) {
          return NextResponse.json({
            error: "Ya existe una habitación con este número en esta sede",
          });
        }
      }
    }

    const room = await prisma.room.create({
      data: {
        roomtype: {
          connect: { id: roomType.id },
        },
        price: parseInt(price),
        adults: parseInt(adults),
        children: parseInt(children),
        roomNumber: parseInt(roomNumber),
        view,
        bedType,
        target,
        description,
        floor: parseInt(floor),
        hotelcenter: {
          connect: { id: hotelCenter?.id },
        },
        amenities: {
          connect: amenities.map((amenitie) => ({ id: amenitie.id })),
        },
      },
    });

    return NextResponse.json(
      { ok: true, message: "Habitación Creada correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
