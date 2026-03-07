"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";

const formSchema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);
    try {
      const response = await axios.post("/api/auth/recuperar-contrasena", {
        email: values.email,
      });

      if (response.data.ok) {
        toast.success(response.data.message);
        setTimeout(() => {
          setFormLoading(false);
        }, 2100);
      } else if (response.data.error) {
        toast.error(response.data.error);
        setTimeout(() => {
          setFormLoading(false);
        }, 2100);
      }
    } catch (error) {
      toast.error("Error interno del servidor");
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
    }
  };

  return (
    <main>
      <section className="flex items-center justify-center min-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 border border-zinc-800 px-6 py-8 rounded-md w-[288px]"
          >
            <h2 className="text-lg font-medium">Cambia tu contraseña</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormDescription>
                    Te enviaremos un correo con el enlace para cambiar tu
                    contraseña
                  </FormDescription>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. ejemplo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col mt-2">
              {formLoading ? (
                <>
                  <ButtonLoading />
                </>
              ) : (
                <>
                  <Button type="submit">Enviar</Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default Page;
