import { Room } from "@/types/Room/room";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShoppingCartState {
  rooms: { room: Room; checkIn: Date; checkOut: Date }[];
  shoppingCartIsOpen: boolean;
  addRoom: ({
    room,
    checkIn,
    checkOut,
  }: {
    room: Room;
    checkIn: Date;
    checkOut: Date;
  }) => void;
  removeRoom: (roomId: string) => void;
  openShoppingCart: (isOpen: boolean) => void;
  setRooms: (
    rooms: {
      room: Room;
      checkIn: Date;
      checkOut: Date;
    }[]
  ) => void;
}

export const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      rooms: [],
      addRoom: (room) => set({ rooms: [...get().rooms, room] }),
      removeRoom: (roomId) =>
        set({ rooms: get().rooms.filter((room) => room.room.id !== roomId) }),
      shoppingCartIsOpen: false,
      openShoppingCart: (isOpen) => set({ shoppingCartIsOpen: isOpen }),
      setRooms: (rooms) => set({ rooms: [...rooms] }),
    }),
    {
      name: "shopping-cart-storage",
    }
  )
);
