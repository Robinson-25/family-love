import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { id, newPassword } = await req.json();

  try {
    const passwordHashed = await bcrypt.hash(newPassword, 10);

    await db.execute(
      "UPDATE User SET password = ? WHERE id = ?",
      [passwordHashed, id]
    );

    return NextResponse.json(
      { ok: true, message: "Contraseña actualizada correctamente" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}