import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const hotelCenter = await prisma.hotelcenter.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json({ ok: true, hotelCenter });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
