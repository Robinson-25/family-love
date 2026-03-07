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
  const form = await req.formData();

  if (!form.get("image")) {
    return NextResponse.json({ error: "Debes subir una imagen" });
  }
  const userId = form.get("userId") as string;
  const image = form.get("image") as File;

  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { image: true },
    });

    if (user?.image?.public_id) {
      const response = await cloudinary.uploader.destroy(user.image.public_id);
    }

    const response: UploadApiResponse | UploadApiErrorResponse | undefined =
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: `${process.env.CLOUDINARY_FOLDER}/usuarios/${user?.username}`,
            },
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            }
          )
          .end(buffer);
      });

    if (response?.http_code) {
      return NextResponse.json({ error: response.message });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        image: {
          create: { url: response?.secure_url, public_id: response?.public_id },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Imagen subida correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
