"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/types/User/user";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo Obligatorio",
  }),
  email: z.string().min(1, { message: "Campo Obligatorio" }),
});

interface Props {
  user: User;
}

const UserEditForm = ({ user }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.username || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingButton(true);
    try {
      if (session) {
        const { data } = await axios.post("/api/users/api/edit", {
          id: session.user.id,
          username: values.name,
          email: values.email,
          role: session.user.role,
        });

        if (data.ok) {
          toast.success(data.message);
          router.refresh();
        } else if (data.error) {
          toast.error(data.error);
        }
      } else {
        signOut();
      }
    } catch (error) {
      toast.error("Algo salió mal vuelve a intentarlo");
    }

    setTimeout(() => {
      setLoadingButton(false);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] space-y-5"
        >
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="ej. robinon@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {loadingButton ? (
              <>
                <ButtonLoading />
              </>
            ) : (
              <>
                <Button type="submit">Guardar Cambios</Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserEditForm;
