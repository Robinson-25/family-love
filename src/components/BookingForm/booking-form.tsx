"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalendarFormField from "./_components/CalendarFormField/calendar-form-field";
import { Loader2 } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { useCheckAvailabilityPageContext } from "@/app/(root)/_components/CheckAvailabilityPageProvider/context-provider";
import { formatLocaleDate } from "@/utils/functions";
import Swal from "sweetalert2";

export type FormSchemaType = UseFormReturn<
  {
    hotelCenter: { id: string; name: string };
    date: { from: Date; to: Date };
    adults: string;
    children: string;
  },
  any,
  undefined
>;

const formSchema = z.object({
  hotelCenter: z.object({
    id: z.string().min(1, { message: "Campo Obligatorio" }),
    name: z.string().min(1, { message: "Campo Obligatorio" }),
  }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z.string().min(1, {
    message: "El número de adultos es requerido",
  }),
  children: z.string().min(1, {
    message: "El número de niños es requerido",
  }),
});

interface Props {
  hotelCenters: HotelCenter[];
  positioning: "horizontal" | "vertical";
  defaultValues?: {
    hotelCenterId: string;
    date: { from: Date; to: Date };
    adults: string;
    children: string;
  };
  className?: string;
}

const BookingForm = ({
  hotelCenters = [],
  positioning,
  defaultValues,
  className,
}: Props) => {
  const router = useRouter();
  const checkAvailabilityPageContext = useCheckAvailabilityPageContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelCenter: defaultValues?.hotelCenterId
        ? {
            name:
              hotelCenters.find(
                (hotelCenter) =>
                  hotelCenter.id === defaultValues?.hotelCenterId
              )?.name ?? "",
            id: defaultValues?.hotelCenterId,
          }
        : hotelCenters.length > 0
        ? {
            id: hotelCenters[0].id,
            name: hotelCenters[0].name,
          }
        : {
            id: "",
            name: "",
          },
      date: defaultValues?.date
        ? {
            from: new Date(defaultValues.date.from),
            to: new Date(defaultValues.date.to),
          }
        : {
            from: new Date(),
            to: addDays(new Date(), 3),
          },
      adults: defaultValues?.adults ?? "1",
      children: defaultValues?.children ?? "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      values.date.from.toLocaleDateString() ===
      values.date.to.toLocaleDateString()
    ) {
      Swal.fire({
        html: `
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-lg font-bold">Fecha inválida</h2>
          <p class="text-sm">Debes haber al menos un día de diferencia entre las fechas seleccionadas</p>
        </div>
        `,
        confirmButtonColor: "#bd9b57",
      });
      return;
    }

    checkAvailabilityPageContext.setSearchButtonLoading(true);

    router.push(
      `/reservar/verificar-disponibilidad?hcId=${values.hotelCenter.id}&check-in=${values.date.from}&check-out=${values.date.to}&adults=${values.adults}&children=${values.children}`
    );

    router.refresh();
  };

  return (
    <div className="h-full flex items-start justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${
            positioning === "horizontal"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
              : "flex flex-col"
          } max-w-[1200px] w-full gap-4 ${className}`}
        >
          <FormField
            control={form.control}
            name="hotelCenter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sede</FormLabel>
                <Select
                  value={field.value.name}
                  onValueChange={(value) => {
                    const selected = hotelCenters.find(
                      (hotelCenter) => hotelCenter.name === value
                    );
                    if (selected) {
                      field.onChange({
                        id: selected.id,
                        name: selected.name,
                      });
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una sede" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotelCenters.map((hotelCenter) => (
                      <SelectItem
                        key={hotelCenter.id}
                        value={hotelCenter.name}
                      >
                        {hotelCenter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <CalendarFormField
            defaultDate={defaultValues?.date}
            form={form}
            label="Check-in - Check-out"
            name="date"
          />

          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Adultos</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map(
                      (item) => (
                        <SelectItem key={item} value={`${item}`}>
                          {item}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Niños</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => i).map((item) => (
                      <SelectItem key={item} value={`${item}`}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-end">
            {checkAvailabilityPageContext.searchButtonLoading ? (
              <Button disabled className="w-full flex gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Buscando...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Buscar
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
