import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    await db.execute("DELETE FROM User WHERE id = ?", [id]);

    return NextResponse.json(
      { ok: true, message: "Usuario eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};