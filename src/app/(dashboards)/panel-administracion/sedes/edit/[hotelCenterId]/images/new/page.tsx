import React from "react";
import FormAddImages from "./_components/Form/form";
import { getHotelCenterById } from "@/db/hotel-center/get-by-id";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const getData = async (hotelCenterId: string): Promise<HotelCenter> => {
  const hotelCenter = await getHotelCenterById(hotelCenterId);
  return hotelCenter as HotelCenter;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const data = await getData(params.hotelCenterId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full">
        <FormAddImages hotelCenter={data} />
      </section>
    </main>
  );
};

export default Page;
