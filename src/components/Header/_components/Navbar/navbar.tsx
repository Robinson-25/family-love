"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);
  return (
    <>
      {/* MENU MOVIL */}
      <div className="flex md:hidden">
        <div className="cursor-pointer" onClick={() => setShowMenuPopup(true)}>
          <Menu className="w-6 h-6" />
        </div>
        <div
          className={`fixed top-0 right-0 left-0 w-full bg-white dark:bg-zinc-950 z-[80] overflow-hidden ${
            showMenuPopup ? "h-full opacity-100" : "h-0 opacity-0"
          } flex flex-col items-center justify-center transition-all duration-500`}
        >
          <div className="w-full max-w-[200px] flex flex-col items-center gap-6">
            <Image
              priority
              src={"/images/hero-images/logo-family-love.png"}
              className="w-full max-w-[100px] mx-auto"
              width={300}
              height={150}
              alt="Logo Family Love"
            />
            <Link href="/" className="font-bold text-gray-900 dark:text-white text-lg" onClick={() => setShowMenuPopup(false)}>Inicio</Link>
            <Link href="/quienes-somos" className="font-bold text-gray-900 dark:text-white text-lg" onClick={() => setShowMenuPopup(false)}>Quiénes Somos</Link>
            <Link href="/proyecto" className="font-bold text-gray-900 dark:text-white text-lg" onClick={() => setShowMenuPopup(false)}>Proyectos</Link>
            <Link href="/programas" className="font-bold text-gray-900 dark:text-white text-lg" onClick={() => setShowMenuPopup(false)}>Programas</Link>
            <Link href="/voluntariado" className="font-bold text-gray-900 dark:text-white text-lg" onClick={() => setShowMenuPopup(false)}>Voluntariado</Link>
          </div>
          <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowMenuPopup(false)}>
            <X className="w-6 h-6" />
          </div>
        </div>
      </div>
      {/* MENU DESKTOP */}
      <div className="hidden md:flex items-center gap-2">
        <Link href="/quienes-somos" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Quiénes Somos</Link>
        <Link href="/proyecto" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Proyectos</Link>
        <Link href="/programas" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Programas</Link>
        <Link href="/voluntariado" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Voluntariado</Link>
      </div>
    </>
  );
}