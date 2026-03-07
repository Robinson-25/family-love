import { prisma } from "@/lib/prisma";


export const getAllAmenities = async () => {
  const amenities = await prisma.amenitie.findMany({
    include: { rooms: true },
  });
  return amenities;
};
