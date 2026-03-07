import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });
    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
