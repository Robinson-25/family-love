import { prisma } from "@/lib/prisma";


export const getRoomTypeById = async (id: string) => {
  const roomType = await prisma.roomtype.findUnique({
    where: {
      id,
    },
  });

  return roomType;
};
