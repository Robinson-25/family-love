import { NextRequest, NextResponse } from "next/server";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";
import { db } from "@/lib/db";

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

    const [userRows] = await db.execute(
      "SELECT u.*, i.public_id, i.url, i.id as imageId FROM User u LEFT JOIN image i ON i.userId = u.id WHERE u.id = ?",
      [userId]
    ) as any;
    const user = (userRows as any[])[0];

    if (user?.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
      await db.execute("DELETE FROM image WHERE userId = ?", [userId]);
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
              if (err) reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

    if (response?.http_code) {
      return NextResponse.json({ error: (response as UploadApiErrorResponse).message });
    }

    await db.execute(
      "INSERT INTO image (url, public_id, userId) VALUES (?, ?, ?)",
      [(response as UploadApiResponse).secure_url, (response as UploadApiResponse).public_id, userId]
    );

    return NextResponse.json({
      ok: true,
      message: "Imagen subida correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};