import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const removedImage = await prisma.image.delete({
      where: { id },
      include: {
        hotelcenter: true,
      },
    });

    const response = await cloudinary.uploader.destroy(removedImage.public_id);

    return NextResponse.json({
      ok: true,
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
