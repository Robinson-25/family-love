import { prisma } from "@/lib/prisma";


export const getAllRoomTypes = async () => {
  const roomTypes = await prisma.roomtype.findMany({
    include: { rooms: true },
  });

  return roomTypes;
};
