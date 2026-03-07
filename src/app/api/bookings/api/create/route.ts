import { createBooking } from "@/db/bookings/create";
import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const POST = async (req: NextRequest) => {
  try {
    const { rooms, creationMode, transactionId, paymentStatus, cellPhone } =
      (await req.json()) as {
        rooms: {
          room: Room;
          checkIn: string;
          checkOut: string;
        }[];
        creationMode: "paid" | "manual";
        transactionId: string;
        paymentStatus: "paid" | "pending";
        cellPhone?: string;
      };

    const session = await getServerSession(authOptions);

    if (session && session.user.id) {
      for (let room of rooms) {
        const booking = await createBooking({
          userId: session.user.id,
          checkIn: new Date(room.checkIn),
          checkOut: new Date(room.checkOut),
          room: room.room,
          creationMode,
          transactionId,
          paymentStatus,
          cellPhone,
        });
        if (creationMode === "paid") {
          setTimeout(async () => {
            const updatedBooking = await prisma.booking.findUnique({
              where: { id: booking.id },
            });
            if (updatedBooking?.paymentStatus === "pending") {
              const removedBooking = await prisma.booking.delete({
                where: { id: updatedBooking.id },
              });
            }
          }, 1000 * 60 * 10);
        }
      }
    } else {
      return NextResponse.json({ error: "El usuario no existe" });
    }

    return NextResponse.json(
      {
        ok: true,
        message:
          "Las reservan se crearon correctamente, gracias por reservar con nosotros, te esperamos",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
