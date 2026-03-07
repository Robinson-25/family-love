import { NextRequest, NextResponse } from "next/server";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { prisma } from "@/lib/prisma";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { roomId, images } = await req.json();

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
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
      message: "Imagenes agregadas correctamente",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
