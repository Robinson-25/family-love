import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

const Page = async () => {
  const data = await getData();

  return (
    <main>
      <section className="pt-12 pb-16">
        <h2 className="text-xl px-6 lg:text-2xl font-medium text-center">
          Elige una de nuestras sedes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-6 px-5 max-w-[600px] mx-auto pt-10">
          {!!data.length ? (
            <>
              {data.map((hotelCenter, i) => (
                <Link
                  key={hotelCenter.id}
                  href={`/sedes/${hotelCenter.urlSegment}`}
                  className="w-full flex flex-col"
                >
                  <div className="max-w-[300px] w-full px-6 py-6 cursor-pointer flex flex-col gap-2 items-center justify-center bg-zinc-100 dark:bg-zinc-950 rounded-md border border-zinc-300 dark:border-zinc-800 hover:bg-[rgb(234,234,234)] dark:hover:bg-zinc-900 transition-all duration-200">
                    <Image
                      src={`/images/hero-images/logo-family-love.png`}
                      width={300}
                      height={150}
                      alt="logo hospedaje"
                      className="w-20"
                    />
                    <p className="text-lg text-center">{hotelCenter.name}</p>
                    <h3 className="text-base">Sede 0{i + 1}</h3>
                    <p className="text-sm text-zinc-400">
                      {hotelCenter.address}
                    </p>
                    <p className="text-sm text-zinc-400">amazonas - Peru</p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
