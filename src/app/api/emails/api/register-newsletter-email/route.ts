import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM newsletterEmail WHERE email = ?",
      [email]
    ) as any;

    const emailExists = (rows as any[])[0];

    if (emailExists) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    await db.execute(
      "INSERT INTO newsletterEmail (email) VALUES (?)",
      [email]
    );

    return NextResponse.json(
      { ok: true, message: "Email registrado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};