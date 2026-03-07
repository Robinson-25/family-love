import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FormSchemaType } from "../../booking-form";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface Props {
  form: FormSchemaType;
  name: "date";
  label: string;
}

const CalendarFormField = ({ form, name, label }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  return (
    <div>
      <FormField
        control={form.control}
        name={`${name}`}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full rounded-none border-t-0 border-r-0 border-l-0 dark:bg-transparent justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                          {format(date.to, "LLL dd, y", { locale: es })}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y", {
                          locale: es,
                        })
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  fromDate={new Date()}
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(value) => {
                    setDate(value);
                    field.onChange(value);
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CalendarFormField;
