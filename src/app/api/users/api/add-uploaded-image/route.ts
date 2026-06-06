import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { userId, image } = await req.json();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM image WHERE userId = ?",
      [userId]
    ) as any;

    const existingImage = (rows as any[])[0];

    if (existingImage) {
      await cloudinary.uploader.destroy(existingImage.public_id);
      await db.execute("DELETE FROM image WHERE userId = ?", [userId]);
    }

    await db.execute(
      "INSERT INTO image (url, public_id, userId) VALUES (?, ?, ?)",
      [image.url, image.public_id, userId]
    );

    return NextResponse.json({
      ok: true,
      message: "Imagen subida correctamente",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};