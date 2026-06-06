import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const [users] = await db.execute("SELECT * FROM User") as any;
    return NextResponse.json({ ok: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};