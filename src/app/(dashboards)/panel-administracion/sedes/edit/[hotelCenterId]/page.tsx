import React from "react";
import EditForm from "./_components/Form/form";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { getHotelCenterById } from "@/db/hotel-center/get-by-id";

const getData = async (hotelCenterId: string): Promise<HotelCenter> => {
  const hotelCenter = await getHotelCenterById(hotelCenterId);
  return hotelCenter as HotelCenter;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const { hotelCenterId } = params;

  const data = await getData(hotelCenterId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full">
        <EditForm hotelCenter={data} />
      </section>
    </main>
  );
};

export default Page;
