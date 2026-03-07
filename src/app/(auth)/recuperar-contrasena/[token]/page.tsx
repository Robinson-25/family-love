"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { ShieldX } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { useRouter } from "next/navigation";
import router from "next/router";
import Loading from "@/app/loading";

const formSchema = z.object({
  password: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
  newPassword: z.string().min(10, {
    message: "Debe tener 10 caracteres como mínimo",
  }),
});

const Page = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  const router = useRouter();

  const [formLoading, setFormLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    if (values.password === values.newPassword) {
      try {
        const response = await axios.post("/api/auth/change-user-password", {
          id: userId,
          newPassword: values.password,
        });

        if (response.data.ok) {
          toast.success(response.data.message);
          setTimeout(() => {
            setFormLoading(false);
            router.push("/login");
          }, 2100);
        }
      } catch (error) {
        setTimeout(() => {
          setFormLoading(false);
        }, 2100);
        toast.error("Algo salió mal, inténtalo de nuevo");
      }
    } else {
      setTimeout(() => {
        setFormLoading(false);
      }, 2100);
      toast.error("Los campos deben ser iguales");
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "/api/auth/validate-password-change-token",
        { token }
      );

      if (response.data.ok) {
        setIsAuthorized(true);
        setUserId(response.data.userId);
      }
    } catch (error) {
      setIsAuthorized(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    validateToken();
  });

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {
    return (
      <main>
        <section className="flex items-center justify-center min-h-screen">
          {isAuthorized ? (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-1 border border-zinc-800 px-6 py-8 rounded-md w-[288px]"
                >
                  <h2 className="text-xl mb-3 font-medium">
                    Cambia tu contraseña
                  </h2>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="************"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repetir Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="************"
                            type="password"
                            {...field}
                          />
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
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-4">
                <ShieldX strokeWidth={1.2} className="w-9 h-9" />
                <p className="px-6">
                  Este enlace no es válido o ya caducó, por favor genera otro
                </p>
                <Link
                  href={`/recuperar-contrasena`}
                  className="px-6 h-10 bg-white text-black rounded-md flex items-center justify-center text-sm font-medium mt-2"
                >
                  Generar enlace
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
    );
  }
};

export default Page;
