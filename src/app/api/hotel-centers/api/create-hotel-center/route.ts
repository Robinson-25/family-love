import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    name,
    reference,
    address,
    mapUrl,
    description,
    phone,
    cellPhone,
    garage,
  } = await req.json();
  try {
    const nameExists = await prisma.hotelcenter.findUnique({
      where: {
        name,
      },
    });
    const addressExists = await prisma.hotelcenter.findUnique({
      where: {
        address,
      },
    });

    if (nameExists) {
      return NextResponse.json({ error: "Ya existe una sede con este nombre" });
    } else if (addressExists) {
      return NextResponse.json({
        error: "Ya existe una sede con esta dirección",
      });
    }

    const hotelCenter = await prisma.hotelcenter.create({
      data: {
        name,
        reference,
        address,
        mapUrl,
        description,
        urlSegment: name.toLowerCase().split(" ").join("-"),
        cellPhone,
        phone,
        garage,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Sede Creada exitosamente", hotelCenter },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
