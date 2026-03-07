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
import { Booking as BookingType } from "@/types/Booking/booking";
import room from "@/app/(root)/pago/_components/ReservationSummaryRoom/room";

interface Props {
  booking: BookingType;
}

const Booking = ({ booking }: Props) => {
  const shoppingCartStore = useShoppingCartStore((state) => state);

  return (
    <div className="relative w-full h-full hover:bg-zinc-200 dark:hover:bg-zinc-900 px-4 py-3 rounded-md transition-all duration-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-[500px]:flex-row gap-4">
            <div
              className={`relative w-[75%] min-[500px]:w-24 sm:w-24 before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.5)] before:opacity-0 before:transition-all before:duration-300`}
            >
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-0">
                <Loader2 className="animate-spin w-7 h-7" />
              </div>
              <Image
                className="w-full max-w-[200px] h-fit"
                src={
                  booking.room.images[0]?.url ? booking.room.images[0].url : ""
                }
                width={150}
                height={150}
                alt={booking.room.roomtype.name}
              />
            </div>
            <div className="flex flex-col gap2  max-w-[210px]">
              <p className=" text-sm">
                {booking.room.roomtype.name}{" "}
                <span className="font-bold text-gold-hr-dark dark:text-gold-hr ml-1">
                  {`x${
                    parseInt(format(booking.checkOut, "dd", { locale: es })) -
                    parseInt(format(booking.checkIn, "dd", { locale: es }))
                  } noches`}
                </span>
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-sm">
                  <span className="">Piso:</span> {booking.room.floor}
                </p>
                <p className="text-sm font-medium">S/ {booking.room.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm flex gap-2 items-center">
            <span className="font-semibold">Check-In:</span>
            {format(booking.checkIn, "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
          <p className="text-sm flex gap-2 items-center">
            <span className="font-semibold">Check-out:</span>
            {format(booking.checkOut, "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
