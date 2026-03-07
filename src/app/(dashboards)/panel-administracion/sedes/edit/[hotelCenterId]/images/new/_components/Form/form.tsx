"use client";

import room from "@/app/(root)/pago/_components/ReservationSummaryRoom/room";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { Button } from "@/components/ui/button";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import axios from "axios";
import { Images } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  hotelCenter: HotelCenter;
}

const FormAddImages = ({ hotelCenter }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-8 items-center justify-center">
      <h2 className="text-xl font-medium">Agrega Imagenes</h2>

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/api/sign-params"
        onQueuesEnd={async (result: any, { widget }) => {
          const images = result.info.files.map((file: any) => ({
            url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id,
          }));

          try {
            const { data } = await axios.post(
              `/api/hotel-centers/api/add-uploaded-images`,
              { hotelCenterId: hotelCenter.id, images: images }
            );
            if (data.ok) {
              toast.success("Imagenes subidas correctamente");
              widget.close();
              router.refresh();
            }
          } catch (error) {
            toast.error("Algo salió mal, vuelve a intentarlo");
          }

          if (result.info) {
            setImageUrls([
              ...imageUrls,
              ...images.map((image: any) => image.url),
            ]);
          }
        }}
        onError={(result, { widget }) => {
          setTimeout(() => {
            toast.error("Ocurió un error durante el proceso");
            widget.close();
          }, 300);
        }}
        options={{
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/sedes/${hotelCenter.name}/images`,
          maxFiles: 5,
          multiple: true,
        }}
      >
        {({ open, cloudinary }) => {
          return (
            <Button
              type="button"
              variant={"bookingFormButton"}
              onClick={() => {
                open();
              }}
              className="flex items-center gap-2"
            >
              <Images className="w-4 h-4" />
              Subir una imagen
            </Button>
          );
        }}
      </CldUploadWidget>

      {!!imageUrls.length && (
        <>
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-base font-medium text-center">
              Vista Previa de Imagenes
            </h3>

            <div className="flex gap-6 flex-wrap max-w-[800px] justify-center pb-16">
              {imageUrls.map((url, i) => (
                <Image
                  key={i}
                  className="h-fit"
                  src={url}
                  width={350}
                  height={200}
                  alt={`Imagen subida ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FormAddImages;
