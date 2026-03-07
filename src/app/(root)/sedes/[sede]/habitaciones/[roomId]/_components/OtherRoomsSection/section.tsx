import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Room } from "@/types/Room/room";
import styles from "./section.module.css";

interface Props {
  room: Room;
}

const OtherRoomsSection = ({ room }: Props) => {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-8 pb-20">
        <div className="text-center w-full flex flex-col gap-3">
          <h2 className="text-3xl font-medium">Otras habitaciones</h2>
          <p>También podrían interesarte</p>
        </div>

        <div className="grid grid-cols-1 justify-items-center lg:grid-cols-3 md:max-w-[900px] xl:max-w-[1100px] w-full gap-10">
          {room.hotelcenter?.rooms
            .filter((data) => data.id !== room.id)
            .map(
              (data, i) =>
                i < 3 && (
                  <div
                    key={data.id}
                    className="flex flex-col gap-3 w-full max-w-[360px] h-full"
                  >
                    <Link
                      href={`/sedes/${data.hotelcenter?.urlSegment}/habitaciones/${data.id}`}
                      className="w-full"
                    >
                      <div
                        className={`w-full overflow-hidden cursor-pointer relative before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.6)] before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 ${styles["container"]}`}
                      >
                        <div
                          className={`absolute w-16 h-[2px] bg-white rotate-90 left-1/2 top-0 -translate-x-1/2 opacity-0 ${styles["item1"]} ${styles["item"]}`}
                        ></div>
                        <div
                          className={`absolute w-16 h-[2px] bg-white top-1/2 translate-x-1/2 right-0 opacity-0 ${styles["item2"]} ${styles["item"]}`}
                        ></div>
                        <Image
                          src={data.images[0] ? data.images[0].url : ""}
                          width={400}
                          height={400}
                          alt={data.roomtype.name}
                          className="w-full h-full"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-center text-xl font-medium py-2">
                        {data.roomtype.name}
                      </h3>
                      <hr className="h-[1px] border-zinc-300 dark:border-zinc-800" />
                      <p className="text-base text-zinc-600 dark:text-zinc-300">
                        {data.target}
                      </p>
                      <div className="grid grid-cols-2 mt-3">
                        <div className="flex flex-col items-center justify-center">
                          <p>Desde</p>
                          <p className="text-xl font-semibold">
                            S/ {data.price}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Link
                            href={`/sedes/${data.hotelcenter?.urlSegment}/habitaciones/${data.id}`}
                            className="border-b border-zinc-800 dark:border-white"
                          >
                            Ver Detalles
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </section>
    </>
  );
};

export default OtherRoomsSection;
