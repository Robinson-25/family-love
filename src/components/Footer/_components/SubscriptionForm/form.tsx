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
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Campo Obligatorio" }),
});

const SubscriptionForm = () => {
  const [loadingForm, setLoadingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingForm(true);

    try {
      const { data } = await axios.post(
        "/api/emails/api/register-newsletter-email",
        values
      );
      if (data.ok) {
        toast.success(data.message);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Algo salió mal, vuelve a intentarlo");
    }

    setTimeout(() => {
      setLoadingForm(false);
    }, 1200);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-center md:text-start md:w-[200px] lg:w-[300px] flex flex-col space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl className="bg-transparent dark:bg-transparent">
                  <input
                    placeholder="Tu mejor correo..."
                    {...field}
                    className="w-full py-2 outline-none px-2 border-b border-zinc-400 dark:border-zinc-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loadingForm ? (
            <>
              <Button
                variant={"bookingFormButton"}
                disabled
                className="flex gap-2 items-center"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Cargando...</span>
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button type="submit" variant={"bookingFormButton"}>
                Suscribirse
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SubscriptionForm;
