import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const amenities = await prisma.amenitie.findMany();

    return NextResponse.json({ ok: true, amenities }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
