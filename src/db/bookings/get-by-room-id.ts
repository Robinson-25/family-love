import { prisma } from "@/lib/prisma";


export const getBookingsByRoomId = async (roomId: string) => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      bookings: {
        include: {
          user: true,
        },
      },
    },
  });
  return room?.bookings;
};
