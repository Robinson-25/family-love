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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Campo obligatorio",
  }),
  email: z
    .string()
    .email({
      message: "Correo no válido",
    })
    .min(1, {
      message: "Campo obligatorio",
    }),
  password: z.string().min(10, {
    message: "Debe tener al menos 10 caracteres",
  }),
  role: z.string().min(1, {
    message: "Campo obligatorio",
  }),
});

const UserForm = () => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setFormLoading(true);

    try {
      const response = await axios.post("/api/auth/register-user", values);
      console.log(response);

      if (response.data.ok) {
        toast.success("Usuario creado exitosamente");
        router.refresh();
        Swal.fire({
          html: `<div>
          <h3 style="font-weight: bold; font-size: 1.6rem; margin-bottom: 14px; color: rgb(220, 220, 220);">Activa tu cuenta</h3>
          <div>
            <p style="font-size: 1rem; line-height: 1.6rem; color: rgb(220, 220, 220);">
              Acabamos de enviar un correo electrónico con un enlace para
              verificar el email de la cuenta recien creada y activarla
            </p>
          </div>
        </div>`,
          confirmButtonColor: "#bd9b57",
          background: "#101010",
        });
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      setFormLoading(false);
    }, 2100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[320px] sm:max-w-[800px] px-6"
        >
          <h2 className="text-xl font-medium">Crea un nuevo Usuario</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="ej. John Doe" {...field} type="text" />
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
                      placeholder="ej. johndoe@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permisos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="colaborator">Colaborador</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
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
    </div>
  );
};

export default UserForm;
