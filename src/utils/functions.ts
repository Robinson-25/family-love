import { Room } from "@/types/Room/room";
import { format } from "date-fns";

export const formatLocaleDate = (date: Date) => {
  const formatedDate = new Date(format(new Date(date), "MM/dd/yyyy"));
  return formatedDate;
};

export const roomIsAvailable = ({
  room,
  checkIn,
  checkOut,
}: {
  room: Room;
  checkIn: Date;
  checkOut: Date;
}) => {
  if (!!room.bookings.length) {
    for (let booking of room.bookings) {
      // if (booking.paymentStatus === "pending") {
      //   continue;
      // }
      if (
        formatLocaleDate(checkOut) > formatLocaleDate(booking.checkIn) &&
        formatLocaleDate(checkOut) <= formatLocaleDate(booking.checkOut)
      ) {
        return false;
      } else if (
        formatLocaleDate(checkIn) >= formatLocaleDate(booking.checkIn) &&
        formatLocaleDate(checkIn) < formatLocaleDate(booking.checkOut)
      ) {
        return false;
      }
    }
  }
  return true;
};
