"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types/User/user";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  user: User;
}

const UserEditImageForm = ({ user }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(undefined);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {session?.user.image ? (
        <>
          <Image
            className="w-28 h-28 rounded-full"
            src={imageUrl ? imageUrl : session.user.image}
            width={200}
            height={200}
            alt="Imagen de perfil"
          />
        </>
      ) : (
        <>
          {imageUrl ? (
            <>
              <Image
                className="w-28 h-28 rounded-full"
                src={imageUrl}
                width={200}
                height={200}
                alt="Imagen de perfil"
              />
            </>
          ) : (
            <>
              <div className="w-28 h-28 rounded-full border border-zinc-300 dark:border-zinc-800 flex items-center justify-center">
                <p className="text-3xl">
                  {session?.user.name && session.user.name[0].toUpperCase()}
                </p>
              </div>
            </>
          )}
        </>
      )}

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
            setImageUrl(images[0].url);
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
            <Button
              variant={"outline"}
              className="gap-2 h-12"
              onClick={() => open()}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Cambiar Imagen</span>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UserEditImageForm;
