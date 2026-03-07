import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const hotelCenter = await prisma.hotelcenter.findUnique({
      where: { id },
      include: { rooms: true, images: true },
    });

    if (hotelCenter?.rooms.length) {
      return NextResponse.json({
        error:
          "La sede debe quedar vacía para poder eliminarla (sin habitaciones)",
      });
    }

    const deletedHotelCenter = await prisma.hotelcenter.delete({
      where: {
        id,
      },
      include: {
        rooms: true,
        images: true,
      },
    });

    if (deletedHotelCenter.images.length) {
      for (let image of deletedHotelCenter.images) {
        const response = await cloudinary.uploader.destroy(image.public_id);
      }
    }

    return NextResponse.json(
      { ok: true, message: "Sede eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
