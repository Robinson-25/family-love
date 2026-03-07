import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const hotelCenters = await prisma.hotelcenter.findMany();

    return NextResponse.json({ ok: true, hotelCenters }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
