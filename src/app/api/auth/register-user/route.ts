import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { username, email, password, role } = await req.json();

  try {
    const [usernameRows]: any = await db.execute(
      "SELECT id FROM user WHERE username = ?",
      [username]
    );
    if (usernameRows.length > 0) {
      return NextResponse.json({ error: "Este usuario ya existe" });
    }

    const [emailRows]: any = await db.execute(
      "SELECT id FROM user WHERE email = ?",
      [email]
    );
    if (emailRows.length > 0) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, passwordHashed, role || "customer"]
    );

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}