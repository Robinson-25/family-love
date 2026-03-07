import { prisma } from "@/lib/prisma";


export const getHotelCenterById = async (id: string) => {
  const hotelCenter = await prisma.hotelcenter.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });
  return hotelCenter;
};
