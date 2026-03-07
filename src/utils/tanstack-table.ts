import { Booking } from "@/types/Booking/booking";
import { formatLocaleDate } from "./functions";
import { Row } from "@tanstack/react-table";

export const tanstackTableFilterFunctions = {
  checkInFilter: (row: Row<Booking>, columnIds: any, filterValue: Date) => {
    console.log(row.original.checkIn);
    if (
      formatLocaleDate(row.original.checkIn) >= formatLocaleDate(filterValue)
    ) {
      return true;
    }
    return false;
  },
  checkOutFilter: (row: Row<Booking>, columnIds: any, filterValue: Date) => {
    console.log(row.original.checkIn);
    if (
      formatLocaleDate(row.original.checkOut) <= formatLocaleDate(filterValue)
    ) {
      return true;
    }
    return false;
  },
};
