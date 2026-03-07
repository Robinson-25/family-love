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

  const roomId = form.get("roomId") as string;
  form.delete("roomId");

  if (!Array.from(form.entries()).length) {
    return NextResponse.json({ error: "Debes subir al menos una imagen" });
  }
  const images: File[] = [];
  form.forEach((item) => {
    const image = item as File;
    images.push(image);
  });

  const imageModels: {
    url: string;
    public_id: string;
  }[] = [];

  try {
    for (let image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const room = await prisma.room.findUnique({
        where: { id: roomId },
      });

      const hotelCenter = await prisma.hotelcenter.findUnique({
        where: { id: room?.hotelCenterId },
      });

      const response: UploadApiResponse | UploadApiErrorResponse | undefined =
        await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: `${process.env.CLOUDINARY_FOLDER}/sedes/${hotelCenter?.name}/habitaciones/${room?.roomNumber}`,
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
      } else {
        imageModels.push({
          url: response?.secure_url,
          public_id: response?.public_id,
        });
      }
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        images: {
          createMany: {
            data: imageModels,
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Imagenes agregadas correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
