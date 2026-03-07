import React from "react";
import DataTableImages from "./_components/DataTableImages/data-table";
import axios from "axios";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { Image } from "@/types/Image/image";
import { columns } from "./_components/DataTableColumns/columns";
import { getHotelCenterById } from "@/db/hotel-center/get-by-id";

const getData = async (hotelCenterId: string): Promise<Image[]> => {
  const hotelCenter = (await getHotelCenterById(hotelCenterId)) as HotelCenter;
  return hotelCenter.images;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const { hotelCenterId } = params;
  const data = await getData(hotelCenterId);

  return (
    <main className="w-full min-h-screen">
      <section className="w-full flex items-center justify-center">
        <DataTableImages columns={columns} data={data} />
      </section>
    </main>
  );
};

export default Page;
