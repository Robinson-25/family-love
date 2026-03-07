import { getHotelCenterById } from "@/db/hotel-center/get-by-id";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";
import ContactEmailForm from "./_components/ContactEmailForm/form";

const getData = async (hotelCenterId: string): Promise<HotelCenter> => {
  const hotelCenter = await getHotelCenterById(hotelCenterId);
  return hotelCenter as HotelCenter;
};

const Page = async ({ params }: { params: { hotelCenterId: string } }) => {
  const data = await getData(params.hotelCenterId);

  return (
    <main>
      <section className=" pt-8 pb-12">
        <div className="px-12 space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 text-3xl font-semibold">
            {data.name}
          </h2>
          <p className="text-zinc-900 dark:text-zinc-100">{data.description}</p>
        </div>

        <iframe
          src={`${data.mapUrl}`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`transition-all duration-500 overflow-hidden w-full h-[400px] mt-8`}
        ></iframe>

        <div className="px-7 sm:px-10 lg:px-16 pt-12 flex flex-col md:flex-row gap-8 lg:gap-16 justify-between">
          <ContactEmailForm />
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <div className="relative text-center flex flex-col gap-4 border border-zinc-300 dark:border-zinc-800 px-16 py-16 before:content-[''] before:absolute before:-top-1.5 before:-right-1.5 before:-bottom-1.5 before:-left-1.5 before:border before:border-zinc-300 before:dark:border-zinc-800">
              <div>
                <h3 className="font-semibold">Family Love</h3>
                <p>{data.address}</p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Cel:</span>{" "}
                  <span>{data.cellPhone}</span>
                </p>
                <p>
                  <span className="font-medium">Tel:</span>{" "}
                  <span>{data.phone}</span>
                </p>
              </div>
            </div>
            <div className="h-auto w-full text-center flex items-center justify-center gap-16">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold">Referencia</h2>
                <p>{data.reference}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;