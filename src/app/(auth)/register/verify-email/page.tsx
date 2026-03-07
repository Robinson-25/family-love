"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      const response = await axios.post("/api/auth/send-verify-email", {
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
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
      toast.error("Error interno del servidor");
    }
  };

  return (
    <main>
      <section className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-[288px] px-6 py-8 border border-zinc-300 dark:border-zinc-800 rounded-md"
          >
            <h2 className="font-medium text-xl">Activa tu cuenta</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormDescription className=" leading-[21px]">
                    Si el correo electrónico es de un usuario ya registrado, te
                    llegará el enlace para activar tu cuenta
                  </FormDescription>
                  <FormLabel>Correo Electónico</FormLabel>
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

        <Link
          href={`/login`}
          className="flex gap-1 items-center justify-center border-b border-transparent hover:border-black dark:hover:border-white transition-all duration-200"
        >
          <p>Iniciar sesión</p>{" "}
          <ArrowUpRight strokeWidth={1.2} className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
};

export default Page;
