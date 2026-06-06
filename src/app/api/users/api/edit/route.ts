import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, username, email, role } = await req.json();

  try {
    const [userRows] = await db.execute(
      "SELECT * FROM User WHERE id = ?",
      [id]
    ) as any;
    const user = (userRows as any[])[0];

    if (!user) {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    const [usernameRows] = await db.execute(
      "SELECT * FROM User WHERE username = ?",
      [username]
    ) as any;
    const usernameExists = (usernameRows as any[])[0];

    const [emailRows] = await db.execute(
      "SELECT * FROM User WHERE email = ?",
      [email]
    ) as any;
    const emailExists = (emailRows as any[])[0];

    if (user.username !== username && usernameExists) {
      return NextResponse.json({ error: "Este nombre de usuario ya existe" });
    }

    if (user.email !== email && emailExists) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    if (user.email === email) {
      await db.execute(
        "UPDATE User SET username = ?, email = ?, role = ? WHERE id = ?",
        [username, email, role, id]
      );
    } else {
      await db.execute(
        "UPDATE User SET username = ?, email = ?, role = ?, emailVerified = NULL WHERE id = ?",
        [username, email, role, id]
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};