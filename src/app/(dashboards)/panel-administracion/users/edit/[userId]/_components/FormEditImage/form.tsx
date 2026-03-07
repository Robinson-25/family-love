"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import { User } from "@/types/User/user";
import { Camera, ImageIcon, Images, Trash2 } from "lucide-react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { open } from "fs";

interface Props {
  user: User;
}

const FormEditImage = ({ user }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string>();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/api/sign-params"
        onQueuesEnd={async (result: any, { widget }) => {
          const images = result.info.files.map((file: any) => ({
            url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id,
          }));
          try {
            const { data } = await axios.post(
              `/api/users/api/add-uploaded-image`,
              { userId: user.id, image: images[0] }
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
            setImageFile(images[0].url);
          }
        }}
        onError={(result, { widget }) => {
          setTimeout(() => {
            toast.error("Ocurió un error durante el proceso");
            widget.close();
          }, 300);
        }}
        options={{
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/usuarios/${user.username}`,
          maxFiles: 1,
          multiple: false,
        }}
      >
        {({ open, cloudinary }) => {
          return (
            <div
              className={`relative w-28 h-28 ${styles["image-container"]}`}
              onClick={() => open()}
            >
              <div
                className={`absolute cursor-pointer w-full h-full flex items-center justify-center flex-col gap-1 bg-zinc-200 dark:bg-zinc-800 rounded-full ${styles.shadow}`}
              >
                <span className="text-xs">Cambiar Foto</span>
                <Camera className="w-4 h-4" />
              </div>
              {user.image?.url ? (
                <Image
                  priority
                  src={user.image.url}
                  className="w-full h-full rounded-full"
                  width={200}
                  height={200}
                  alt={`Foto de perfil de ${user.username}`}
                />
              ) : (
                <>
                  <div className="border rounded-full border-zinc-300 dark:border-zinc-800 w-full h-full flex items-center justify-center">
                    <p className="text-3xl">{user.username[0]}</p>
                  </div>
                </>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/api/sign-params"
        onQueuesEnd={async (result: any, { widget }) => {
          const images = result.info.files.map((file: any) => ({
            url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id,
          }));

          try {
            const { data } = await axios.post(
              `/api/users/api/add-uploaded-image`,
              { userId: user.id, image: images[0] }
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
            setImageFile(images[0].url);
          }
        }}
        onError={(result, { widget }) => {
          setTimeout(() => {
            toast.error("Ocurió un error durante el proceso");
            widget.close();
          }, 300);
        }}
        options={{
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/usuarios/${user.username}`,
          maxFiles: 1,
          multiple: false,
        }}
      >
        {({ open, cloudinary }) => {
          return (
            <div
              onClick={() => open()}
              className="text-black cursor-pointer dark:text-white border flex items-center gap-2 h-12 px-5 rounded-md text-sm border-zinc-300 dark:border-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
              <span>Cambiar Imagen</span>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FormEditImage;
