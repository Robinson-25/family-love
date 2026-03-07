"use client";

import React, { useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./form.module.css";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Campo obligatorio",
  }),
  reference: z.string().min(1, {
    message: "Campo obligatoria",
  }),
  address: z.string().min(1, {
    message: "Campo obligatoria",
  }),
  mapUrl: z.string().url({ message: "URL no válida" }).min(1, {
    message: "Campo obligatorio",
  }),
  phone: z.string(),
  cellPhone: z.string(),
  garage: z.boolean(),
  description: z.string().min(1, {
    message: "Campo obligatorio",
  }),
});

const CreateForm = () => {
  const router = useRouter();

  const [formLoading, setFormLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      reference: "",
      address: "",
      mapUrl: "",
      description: "",
      phone: "",
      cellPhone: "",
      garage: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.name.includes("-")) {
      toast.error("El nombre no debe tener guiones '-'");
      return;
    }

    setFormLoading(true);

    try {
      const response = await axios.post(
        "/api/hotel-centers/api/create-hotel-center",
        values
      );

      if (response.data.ok) {
        toast.success(response.data.message);
        router.refresh();
        setTimeout(() => {
          router.push(
            `/panel-administracion/sedes/edit/${response.data.hotelCenter.id}/images/new`
          );
        }, 3000);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }
    setTimeout(() => {
      setFormLoading(false);
      form.reset();
    }, 2100);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-[360px] sm:max-w-[800px] px-6"
        >
          <h2 className="text-2xl font-medium mb-6">Crea una nueva sede</h2>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {" "}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ej. Hospedaje Rinconcito - Principal"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referencia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ej. Centro de Jauja"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ej. Jr. Salaverry 861"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mapUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url de Mapa</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className={`${styles["phone-input-container"]} focus-within:outline-2 focus-within:outline-zinc-800 dark:border-zinc-800 dark:focus-within:outline-2 dark:focus-within:outline-zinc-100`}
                        placeholder="ej. 064 (362866)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cellPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className={`${styles["phone-input-container"]} focus-within:outline-2 focus-within:outline-zinc-800 dark:border-zinc-800 dark:focus-within:outline-2 dark:focus-within:outline-zinc-100`}
                        placeholder="ej. 997706692"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="garage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cochera</FormLabel>
                    <Select
                      value={field.value ? "si" : "no"}
                      onValueChange={(value) => {
                        field.onChange(value === "si" ? true : false);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elige una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"si"}>Si</SelectItem>
                        <SelectItem value={"no"}>No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A unos cuantos minutos de la ciudad, cuenta con cuartos cómodos elegantes, además de cochera donde estaciones tu vehículo (gratis)..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default CreateForm;
