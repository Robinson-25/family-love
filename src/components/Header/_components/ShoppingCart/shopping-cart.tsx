"use client";

import React, { MouseEvent, useState } from "react";
import { Ban, BedDouble, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useShoppingCartStore } from "@/store/shoppingCartStore";
import styles from "./shopping-cart.module.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ShoppingCartRoomsContainer from "./_components/ShoppingCartRoomsContainer/rooms-container";

const ShoppingCart = () => {
  const shoppingCartStore = useShoppingCartStore((state) => state);
  const router = useRouter();
  const { data: session } = useSession();
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <div className="relative z-[90] flex items-center">
      <Sheet
        open={shoppingCartStore.shoppingCartIsOpen}
        onOpenChange={shoppingCartStore.openShoppingCart}
      >
        <SheetTrigger>
          <div className="relative cursor-pointer">
            <p className="absolute top-[-9px] right-[-9px] bg-red-500 text-white h-5 w-5 flex items-center justify-center text-xs font-medium rounded-full">
              {shoppingCartStore.rooms.length}
            </p>
            <BedDouble strokeWidth={1.5} className="h-6 w-6" />
          </div>
        </SheetTrigger>
        <SheetContent
          className={`border-none overflow-y-scroll ${styles["sheet-content"]} z-[90]`}
        >
          <SheetHeader>
            <SheetTitle>Resumen de compra</SheetTitle>
            <SheetDescription>
              Estas son todas las habitaciones que elegiste, haz click en
              Finalizar Reserva para cancelar el monto total
            </SheetDescription>
          </SheetHeader>
          <section>
            {shoppingCartStore.rooms.length ? (
              <ShoppingCartRoomsContainer />
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center h-40">
                <div className="relative">
                  <div className="absolute -top-1 -right-1">
                    <Ban className="w-3 h-3" />
                  </div>
                  <BedDouble className="w-6 h-6" strokeWidth={1.2} />
                </div>
                <p className="text-sm text-center">Carrito vacío</p>
                <p className="text-sm text-center">
                  Agrega algunas habitaciones
                </p>
              </div>
            )}
          </section>
          {!!shoppingCartStore.rooms.length ? (
            <SheetFooter>
              {loadingButton ? (
                <Button
                  disabled
                  variant={"bookingFormButton"}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Redirigiendo...</span>
                </Button>
              ) : (
                <Button
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    setLoadingButton(true);
                    if (session) {
                      router.push(`/pago`);
                      setTimeout(() => {
                        setLoadingButton(false);
                        shoppingCartStore.openShoppingCart(false);
                      }, 1200);
                    } else {
                      toast.error("Error: Debes iniciar sesión primero");
                      setTimeout(() => {
                        setLoadingButton(false);
                      }, 1200);
                    }
                  }}
                  variant={"bookingFormButton"}
                  className="w-full"
                >
                  Realizar Pago
                </Button>
              )}
            </SheetFooter>
          ) : (
            <></>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShoppingCart;
