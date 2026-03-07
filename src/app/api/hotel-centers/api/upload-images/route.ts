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
  const hotelCenterId = form.get("hotelCenterId") as string;
  form.delete("hotelCenterId");

  if (!Array.from(form.entries()).length) {
    return NextResponse.json({ error: "Debes subir al menos una imagen" });
  }

  const images: File[] = [];
  form.forEach((item) => {
    const image = item as File;
    images.push(image);
  });

  try {
    const imageModels: { url: string; public_id: string }[] = [];

    for (let image of images) {
      console.log(image);
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const hotelCenter = await prisma.hotelcenter.findUnique({
        where: { id: hotelCenterId },
      });

      const response: UploadApiResponse | UploadApiErrorResponse | undefined =
        await new Promise((resolve) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: `Hospedaje Rinconcito/sedes/${hotelCenter?.name}`,
              },
              (err, result) => {
                if (err) {
                  return resolve(err);
                }
                return resolve(result);
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

    const updatedHotelCenter = await prisma.hotelcenter.update({
      where: { id: hotelCenterId },
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
      message: "Imagenes subidas correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
