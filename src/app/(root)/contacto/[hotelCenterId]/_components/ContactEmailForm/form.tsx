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
import { Button } from "@/components/ui/button";
import { Loader2, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./form.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string({ required_error: "Campo Obligatorio" }).min(1, {
    message: "Debe tener por lo menos un caracter",
  }),
  email: z.string().min(1, { message: "Campo Obligatorio" }),
  cellPhone: z.string().min(1, { message: "Campo Obligatorio" }),
  message: z.string().min(10, { message: "Campo Obligatorio" }),
});

const ContactEmailForm = () => {
  const [loadingForm, setLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", cellPhone: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingForm(true);
    try {
      const { data } = await axios.post("/api/emails/api/send-contact-email", values);
      if (data.ok) {
        toast.success(data.message);
        form.reset();
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }
    setTimeout(() => setLoadingForm(false), 1500);
  };

  return (
    <div
      className="w-full rounded-3xl p-8 shadow-xl bg-white dark:bg-zinc-900"
      style={{ border: "4px solid #73eafe" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">

          <h2 className="text-2xl font-extrabold" style={{ color: "#0271bd" }}>
            Formulario de Voluntariado
          </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-zinc-700 dark:text-zinc-300">Nombre</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Robinson B..."
                    className="rounded-xl border-zinc-300 focus-visible:ring-[#0271bd]"
                    {...field}
                  />
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
                <FormLabel className="font-semibold text-zinc-700 dark:text-zinc-300">Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="familylove@gmail.com"
                    className="rounded-xl border-zinc-300 focus-visible:ring-[#0271bd]"
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
                <FormLabel className="font-semibold text-zinc-700 dark:text-zinc-300">Celular</FormLabel>
                <FormControl>
                  <PhoneInput
                    className={`${styles["phone-input-container"]} focus-within:outline-2 focus-within:outline-zinc-800 dark:border-zinc-800 dark:focus-within:outline-2 dark:focus-within:outline-zinc-100`}
                    placeholder="+51 987321465"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-zinc-700 dark:text-zinc-300">Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tu mensaje..."
                    className="rounded-xl border-zinc-300 focus-visible:ring-[#0271bd] resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loadingForm ? (
            <Button
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #0271bd 0%, #6923b7 100%)" }}
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enviando...</span>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ background: "linear-gradient(135deg, #0271bd 0%, #6923b7 100%)" }}
            >
              <span>Enviar mensaje</span>
              <SendHorizonal className="w-4 h-4" />
            </Button>
          )}

        </form>
      </Form>
    </div>
  );
};

export default ContactEmailForm;