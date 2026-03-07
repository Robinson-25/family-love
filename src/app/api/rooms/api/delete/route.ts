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
    const deletedRoom = await prisma.room.delete({
      where: { id },
      include: {
        amenities: true,
        hotelcenter: true,
        images: true,
      },
    });

    if (deletedRoom.images.length) {
      for (let image of deletedRoom.images) {
        const response = await cloudinary.uploader.destroy(image.public_id);
      }
    }

    return NextResponse.json(
      { ok: true, message: "Habitación eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
