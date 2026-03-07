import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { orderId } = await req.json();

  try {
    const bookings = await prisma.booking.findMany({
      where: { transactionId: orderId },
    });

    if (!!bookings.length) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({
        error: "No existen reservas con este transactionId",
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
