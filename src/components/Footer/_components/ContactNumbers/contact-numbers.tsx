import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import React from "react";

interface Props {
  hotelCenters: HotelCenter[];
}

const ContactNumbers = ({ hotelCenters }: Props) => {
  return (
    <>
      {!!hotelCenters.length ? (
        <>
          <div>
            {hotelCenters.map((hotelCenter) => (
              <div key={hotelCenter.id}>
                <p className="mt-6">
                  Celular/Whatsapp: {hotelCenter.cellPhone}
                </p>
                <p className="mt-1">Teléfono: {hotelCenter.phone}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactNumbers;
