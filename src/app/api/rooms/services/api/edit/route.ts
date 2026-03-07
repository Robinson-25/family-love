import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { id, name } = await req.json();

  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (service?.name === name) {
      return NextResponse.json({
        ok: true,
        message: "Actualizado correctamente",
      });
    }

    const serviceNameExists = await prisma.service.findUnique({
      where: { name },
    });

    if (serviceNameExists) {
      return NextResponse.json({ error: "Este nombre ya existe" });
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
