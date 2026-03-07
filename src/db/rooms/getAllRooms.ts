import { prisma } from "@/lib/prisma";


export const getAllRooms = async () => {
  const rooms = await prisma.room.findMany({
    include: {
      roomtype: true,
      images: true,
      amenities: true,
      hotelcenter: true,
    },
  });

  return rooms;
};
