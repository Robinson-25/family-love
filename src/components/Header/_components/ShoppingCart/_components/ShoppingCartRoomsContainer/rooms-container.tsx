import { useShoppingCartStore } from "@/store/shoppingCartStore";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShoppingCartRoom from "../ShoppingCartRoom/room";
import { Loader2 } from "lucide-react";

const ShoppingCartRoomsContainer = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [showRooms, setShowRooms] = useState(false);

  const getNonExistingIds = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "/api/rooms/api/check-existing-rooms",
        shoppingCartStore.rooms
      );

      if (data.ok) {
        for (let id of data.ids) {
          shoppingCartStore.removeRoom(id);
        }
        setShowRooms(true);
      }
    } catch (error) {
      toast.error("Error interno del servidor");
    }
  }, [shoppingCartStore, setShowRooms]);

  useEffect(() => {
    getNonExistingIds();
  }, [getNonExistingIds]);

  if (showRooms) {
    return (
      <div className="flex flex-col gap-3 py-6">
        {shoppingCartStore.rooms.map((room) => (
          <ShoppingCartRoom key={room.room.id} room={room} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-sm py-12">
        <Loader2 className="animate-spin" />
        <p>Cargando Habitaciones...</p>
      </div>
    );
  }
};

export default ShoppingCartRoomsContainer;
