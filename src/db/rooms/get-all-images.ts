import { prisma } from "@/lib/prisma";


export const getAllRoomImages = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
  return room;
};
