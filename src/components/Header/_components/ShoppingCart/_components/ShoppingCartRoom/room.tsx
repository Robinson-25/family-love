"use client";

import { useShoppingCartStore } from "@/store/shoppingCartStore";
import { Room } from "@/types/Room/room";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./room.module.css";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  room: { room: Room; checkIn: Date; checkOut: Date };
}

const ShoppingCartRoom = ({ room }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const [removingRoom, setRemovingRoom] = useState(false);

  return (
    <div className="relative w-full h-full ">
      <Link
        href={`/sedes/${room.room.hotelcenter.name}/habitaciones/${room.room.id}`}
        className="w-full h-full flex items-center justify-start px-4 py-3 border-t border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-all duration-300"
      >
        <div className="flex flex-col items-start justify-between gap-4">
          <div className="flex flex-col min-[500px]:flex-row items-center justify-center gap-4">
            <div
              className={`relative w-[75%] min-[500px]:w-24 sm:w-24 before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.5)] before:opacity-0 before:transition-all before:duration-300 ${
                removingRoom ? styles["image-container"] : ""
              }`}
            >
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-0 text-white">
                <Loader2 className="animate-spin w-7 h-7" />
              </div>
              <Image
                className="w-full max-w-[200px] h-fit"
                src={room.room.images[0]?.url ? room.room.images[0].url : ""}
                width={150}
                height={150}
                alt={room.room.roomtype.name}
              />
            </div>
            <div className="flex flex-col gap-2  max-w-[180px]">
              <p className=" text-sm ">{room.room.roomtype.name}</p>
              <div className="flex flex-col gap-1">
                <p className="text-sm">
                  <span className="">Piso:</span> {room.room.floor}
                </p>
                <p className="text-sm font-medium">S/ {room.room.price}</p>
              </div>
            </div>
          </div>
          <div className="text-sm">
            <p className="flex gap-2 items-center">
              <span className="font-semibold">Check-in:</span>
              <span>
                {format(room.checkIn, "dd 'de' MMMM 'del' yyyy", {
                  locale: es,
                })}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-semibold">Check-out:</span>
              <span>
                {format(room.checkOut, "dd 'de' MMMM 'del' yyyy", {
                  locale: es,
                })}
              </span>
            </p>
          </div>
        </div>
      </Link>
      <div
        className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all duration-200"
        onClick={() => {
          setRemovingRoom(true);

          setTimeout(() => {
            shoppingCartStore.removeRoom(room.room.id);
            setRemovingRoom(false);
          }, 1000);
        }}
      >
        <X className="w-3.5 h-3.5 text-black dark:text-white" />
      </div>
    </div>
  );
};

export default ShoppingCartRoom;
