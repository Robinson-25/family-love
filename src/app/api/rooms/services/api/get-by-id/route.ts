import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    return NextResponse.json({ ok: true, service });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
