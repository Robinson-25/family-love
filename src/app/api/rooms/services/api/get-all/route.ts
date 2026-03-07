import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json({ ok: true, services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
