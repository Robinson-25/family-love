import { Room } from "@/types/Room/room";
import React from "react";
import HeroSection from "./_components/HeroSection/hero";
import DescriptionSection from "./_components/DescriptionSection/description";
import ImagesSection from "./_components/ImagesSection/section";
import OtherRoomsSection from "./_components/OtherRoomsSection/section";
import { getRoomById } from "@/db/rooms/get-by-id";

const getData = async (roomId: string): Promise<{ room: Room }> => {
  const room = await getRoomById(roomId);
  return { room: room as Room };
};

const Page = async ({ params }: { params: { roomId: string } }) => {
  const data = await getData(params.roomId);

  return (
    <main className="w-full">
      <HeroSection data={data.room} />
      <DescriptionSection room={data.room} />
      <ImagesSection room={data.room} />
      <OtherRoomsSection room={data.room} />
    </main>
  );
};

export default Page;
