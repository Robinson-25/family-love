import { prisma } from "@/lib/prisma";


export const getBookingsByUserId = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { room: { include: { roomtype: true, images: true } } },
  });
  return bookings;
};
