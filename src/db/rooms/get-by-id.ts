import { prisma } from "@/lib/prisma";


export const getRoomById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      amenities: true,
      roomtype: true,
      images: true,
      hotelcenter: {
        include: {
          rooms: {
            include: {
              images: true,
              roomtype: true,
              amenities: true,
              hotelcenter: true,
              bookings: true,
            },
          },
        },
      },
    },
  });
  return room;
};
