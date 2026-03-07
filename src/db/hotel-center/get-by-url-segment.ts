import { prisma } from "@/lib/prisma";


export const getHotelCenterByUrlSegment = async (urlSegment: string) => {
  const hotelCenter = await prisma.hotelcenter.findUnique({
    where: {
      urlSegment,
    },
    include: {
      rooms: {
        include: {
          images: true,
          amenities: true,
          hotelcenter: true,
          roomtype: true,
        },
      },
    },
  });
  return hotelCenter;
};
