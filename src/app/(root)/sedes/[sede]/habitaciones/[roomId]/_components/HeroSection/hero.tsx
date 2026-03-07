"use client";

import { Room } from "@/types/Room/room";
import React from "react";

interface Props {
  data: Room;
}

const HeroSection = ({ data }: Props) => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url('${data.images[0] ? data.images[0].url : ""}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={`h-[400px] w-full relative before:content-[''] before:h-full before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.5)]`}
      >
        <div className="relative z-10 text-center h-full flex flex-col gap-3 items-center justify-center px-6">
          <h1 className="text-3xl min-[400px]:text-4xl text-zinc-100 font-medium">
            {data.roomtype.name}
          </h1>
          <p className="text-zinc-200">{data.target}</p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
