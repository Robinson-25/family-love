"use client";

import Image from "next/image";
import React from "react";

const OfficeSection = () => {
  return (
    <section className="pb-20 pt-6">
      <h2 className="text-xl px-6 lg:text-2xl xl:text-3xl font-medium text-center">
        Visita una de nuestras sedes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-6 px-5 max-w-[600px] mx-auto pt-10">
        <div className="max-w-[300px] w-full px-6 py-6 cursor-pointer flex flex-col gap-2 items-center justify-center bg-zinc-100 dark:bg-zinc-950 rounded-md border border-zinc-300 dark:border-zinc-800 hover:bg-[rgb(234,234,234)] dark:hover:bg-zinc-900 transition-all duration-200">
          <Image
            src={`/images/logo_hospedaje.png`}
            width={300}
            height={150}
            alt="logo hospedaje"
            className="w-20"
          />
          <p className="text-lg">Centro de Jauja</p>
          <h3 className="text-base">Sede 01</h3>
          <p className="text-sm text-zinc-400">Jr. Salaverry 861</p>
          <p className="text-sm text-zinc-400">Jauja - Peru</p>
        </div>
        <div className="max-w-[300px] w-full px-6 py-6 cursor-pointer flex flex-col gap-2 items-center justify-center bg-zinc-100 dark:bg-zinc-950 rounded-md border border-zinc-300 dark:border-zinc-800 hover:bg-[rgb(234,234,234)] dark:hover:bg-zinc-900 transition-all duration-200">
          <Image
            src={`/images/logo_hospedaje.png`}
            width={300}
            height={150}
            alt="logo hospedaje"
            className="w-20"
          />
          <p className="text-lg">Cerca al Aeropuerto</p>
          <h3 className="text-base">Sede 02</h3>
          <p className="text-sm text-zinc-400">Jr. Victor Balvin 121</p>
          <p className="text-sm text-zinc-400">Jauja - Peru</p>
        </div>
      </div>
    </section>
  );
};

export default OfficeSection;
