import { prisma } from "@/lib/prisma";

import { Room } from "@/types/Room/room";
import { roomIsAvailable } from "@/utils/functions";

interface Body {
  hotelCenterId: string;
  checkIn: Date;
  checkOut: Date;
  adults: string;
  children: string;
}

export const getAvailableRooms = async ({
  hotelCenterId,
  checkIn,
  checkOut,
  adults,
  children,
}: Body) => {
  const hotelCenter = await prisma.hotelcenter.findUnique({
    where: { id: hotelCenterId },
    include: {
      rooms: {
        include: {
          bookings: true,
          images: true,
          amenities: true,
          roomtype: true,
          hotelcenter: true,
        },
      },
    },
  });

  const availableRooms: Room[] = [];

  if (hotelCenter?.rooms.length) {
    for (let room of hotelCenter?.rooms) {
      if (roomIsAvailable({ room: room as Room, checkIn, checkOut })) {
        availableRooms.push(room as Room);
      }
    }
  }

  return availableRooms;
};
