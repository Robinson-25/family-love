import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";

interface Props {
  hotelCenters: HotelCenter[];
}

const FooterLocations = ({ hotelCenters }: Props) => {
  return (
    <>
      {!!hotelCenters.length ? (
        <>
          {hotelCenters.map((hotelCenter) => (
            <div key={hotelCenter.id}>
              <p className="mt-6 font-bold">{hotelCenter.name}</p>
              <p className="mt-1">{hotelCenter.address} Jauja - Perú</p>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FooterLocations;
