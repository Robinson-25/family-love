import { prisma } from "@/lib/prisma";


export const getAllHotelCenters = async () => {
  const hotelCenters = await prisma.hotelcenter.findMany({
    include: { rooms: true, images: true },
  });

  return hotelCenters;
};
