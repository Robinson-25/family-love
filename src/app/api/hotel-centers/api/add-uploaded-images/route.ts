import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export const POST = async (req: NextRequest) => {
  const { images, hotelCenterId } = await req.json();

  try {
    const updatedHotelCenter = await prisma.hotelcenter.update({
      where: { id: hotelCenterId },
      data: {
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Imagenes subidas correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
