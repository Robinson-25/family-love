import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { userId, image } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { image: true },
    });
    if (user?.image) {
      const deletedImage = await prisma.image.delete({
        where: { id: user?.image?.id },
      });
      const response = await cloudinary.uploader.destroy(
        user?.image?.public_id as string
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        image: {
          create: { url: image.url, public_id: image.public_id },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Imagen subida correctamente",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
