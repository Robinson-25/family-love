import { Booking } from "../Booking/booking";
import { HotelCenter } from "../HotelCenter/hotelCenterTypes";
import { Image } from "../Image/image";
import { RoomType } from "./RoomType";
import { Amenitie } from "./amenitie";

export type Room = {
  id: string;
  price: number;
  adults: number;
  bedType: string;
  children: number;
  description: string;
  roomNumber: number;
  target: string;
  view: string;
  roomtype: RoomType;
  roomTypeId: string;
  floor: number;
  hotelCenterId: string;
  hotelcenter: HotelCenter;
  amenities: Amenitie[];
  images: Image[];
  bookings: Booking[];
};
