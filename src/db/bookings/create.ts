import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";

export const createBooking = async ({
  userId,
  checkIn,
  checkOut,
  room,
  creationMode,
  transactionId,
  paymentStatus,
  cellPhone,
}: {
  userId: string;
  checkIn: Date;
  checkOut: Date;
  room: Room;
  creationMode: "paid" | "manual";
  transactionId: string;
  paymentStatus: "paid" | "pending";
  cellPhone?: string;
}) => {
  const booking = await prisma.booking.create({
    data: {
      userId,
      checkIn,
      checkOut,
      roomId: room.id,
      creationMode: creationMode ? creationMode : "manual",
      transactionId,
      paymentStatus,
      cellPhone,
    },
  });

  return booking;
};
