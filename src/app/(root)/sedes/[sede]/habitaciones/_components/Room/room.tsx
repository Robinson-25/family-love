import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Room as RoomType } from "@/types/Room/room";
import Image from "next/image";
import {
  Baby,
  Bed,
  BedDouble,
  Check,
  ChevronRight,
  CloudSun,
  Hotel,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Props {
  room: RoomType;
  hotelCenterId: string;
  orderChildren: [string, string];
}

const Room = ({ room, hotelCenterId, orderChildren }: Props) => {
  return (
    <div className="flex flex-col min-[560px]:flex-row px-6 justify-between gap-12 w-full max-w-[900px]">
      <div className={`w-full order-1 min-[500px]:order-2`}>
        <Carousel className="rounded-md overflow-hidden">
          <CarouselContent>
            {room.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  className=""
                  src={image.url}
                  width={800}
                  height={800}
                  alt="Foto de la habitación"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </div>
      <div className={`w-full order-2 min-[500px]:order-1`}>
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">{room.roomtype.name}</h2>
          <div className="">
            <p className="text-sm">Precio</p>
            <p className="text-3xl font-bold">S/ {room.price}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {room.amenities.map((amenitie) => (
              <div key={amenitie.id} className="flex items-center gap-2">
                <Check className="w-3 h-3" />
                <span className="text-sm">{amenitie.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full max-w-[280px]">
            <div className="grid grid-cols-2 text-sm">
              <div className="flex items-center gap-3">
                <BedDouble className="w-4 h-4" />
                <span className="font-semibold">Cama:</span>
              </div>
              <span>{room.bedType}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span className="font-semibold">Adultos:</span>
              </div>
              <span>{room.adults}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex items-center gap-3">
                <Baby className="w-4 h-4" />
                <span className="font-semibold">Niños:</span>
              </div>
              <span>{room.children}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex items-center gap-3">
                <Hotel className="w-4 h-4" />
                <span className="font-semibold">Piso:</span>
              </div>
              <span>{room.floor}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="flex items-center gap-3">
                <CloudSun className="w-4 h-4" />
                <span className="font-semibold">Vista:</span>
              </div>
              <span>{room.view}</span>
            </div>
          </div>

          <Link
            href={`/sedes/${hotelCenterId}/habitaciones/${room.id}`}
            className="h-11 text-white font-medium w-[200px] flex items-center justify-center gap-2 text-sm border border-gold-hr-dark bg-gold-hr-dark hover:scale-110 rounded-md transition-all duration-300"
          >
            <span>Ver Detalles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
