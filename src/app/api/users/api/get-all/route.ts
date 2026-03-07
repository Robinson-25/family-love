import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { image: true, bookings: true },
    });
    return NextResponse.json({ ok: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
