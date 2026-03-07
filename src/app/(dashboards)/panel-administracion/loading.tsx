import Image from "next/image";
import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div>
      <div className="fixed z-50 bg-white dark:bg-zinc-950 top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center gap-3 w-full h-full">
        <Image
          src={`/images/logo_hospedaje.png`}
          alt="logo hospedaje"
          width={300}
          height={150}
          className="w-28 mx-auto"
        />

        <div className="flex gap-3 items-center justify-center">
          <Loader2 className=" text-gold-hr animate-spin" />
          <p className="text-black dark:text-white text-sm">Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
