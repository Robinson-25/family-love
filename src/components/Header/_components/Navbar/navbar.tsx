"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import styles from "./navbar.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface Props {
  hotelCentersData: HotelCenter[];
}

export default function Navbar({ hotelCentersData }: Props) {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);

  return (
    <>
      {/* MENÚ MÓVIL */}
      <div className="flex sm:hidden">
        <div className="cursor-pointer" onClick={() => setShowMenuPopup(true)}>
          <Menu className="w-6 h-6" />
        </div>
        <div
          className={`fixed top-0 right-0 left-0 cursor-pointer w-full bg-white dark:bg-zinc-950 z-[10] overflow-hidden ${
            showMenuPopup ? `h-full opacity-100` : "h-0 opacity-0"
          } flex flex-col items-center justify-center transition-all duration-500`}
        >
          <div className="w-full max-w-[150px]">
            <Image
              priority
              src={"/images/hero-images/logo-family-love.png"}
              className="w-full max-w-[100px] mx-auto mb-4"
              width={300}
              height={150}
              alt="Logo Family Love"
            />
            <Link
              href={`/`}
              className="font-medium block mt-2"
              onClick={() => setShowMenuPopup(false)}
            >
              Inicio
            </Link>
            <Accordion type="single" collapsible className="w-full">
              
            </Accordion>
            <Link
              href={`/quienes-somos`}
              className="font-medium block mt-2"
              onClick={() => setShowMenuPopup(false)}
            >
              Quiénes Somos
            </Link>
            <Link
              href={`/proyecto`}
              className="font-medium block mt-2"
              onClick={() => setShowMenuPopup(false)}
            >
              Proyecto
            </Link>
            <Link
              href={`/programas`}
              className="font-medium block mt-2"
              onClick={() => setShowMenuPopup(false)}
            >
              Programa
            </Link>
            <Link
              href={`/voluntariado`}
              className="font-medium block mt-2"
              onClick={() => setShowMenuPopup(false)}
            >
              Voluntariado
            </Link>
            
          </div>

          <div
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center"
            onClick={() => setShowMenuPopup(false)}
          >
            <X className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MENÚ DESKTOP */}
      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList>
        
          <NavigationMenuItem>
            <Link href={`/quienes-somos`} className="text-sm font-medium px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">
              Quiénes Somos
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/proyecto`} className="text-sm font-medium px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">
              Proyectos
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/programas`} className="text-sm font-medium px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">
              Programas
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/voluntariado`} className="text-sm font-medium px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">
              Voluntariado
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="">
      <Link legacyBehavior passHref ref={ref} {...props}>
        <NavigationMenuLink
          className={cn(
            "flex flex-col rounded-md gap-1 px-5 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all duration-150",
            className
          )}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className="text-sm">{children}</p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";