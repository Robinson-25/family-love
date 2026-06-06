import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE id = ?",
      [id]
    ) as any;
    const user = (rows as any[])[0];
    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};