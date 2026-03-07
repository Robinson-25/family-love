import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    id,
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
    const hotelCenter = await prisma.hotelcenter.findUnique({
      where: { id },
    });
    console.log(hotelCenter);

    if (hotelCenter?.name !== name) {
      const nameExists = await prisma.hotelcenter.findUnique({
        where: { name },
      });
      if (nameExists) {
        return NextResponse.json({ error: "Este nombre ya existe" });
      }
    }
    if (hotelCenter?.address !== address) {
      console.log(hotelCenter?.address, address);
      const addressExists = await prisma.hotelcenter.findUnique({
        where: { address },
      });
      if (addressExists) {
        return NextResponse.json({ error: "Esta dirección de sede ya existe" });
      }
    }

    const updatedHotelCenter = await prisma.hotelcenter.update({
      where: {
        id,
      },
      data: {
        name,
        reference,
        address,
        mapUrl,
        urlSegment: name.toLowerCase().split(" ").join("-"),
        description,
        cellPhone,
        phone,
        garage,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Sede editada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
