import { HotelCenter } from "../HotelCenter/hotelCenterTypes";
import { Room } from "../Room/room";
import { User } from "../User/user";

export type Image = {
  id: string;
  url: string;
  public_id: string;
  hotelCenterId?: string;
  hotelcenter?: HotelCenter;
  roomId?: string;
  room?: Room;
  userId?: string;
  user?: User;
};
