"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [showMenuPopup, setShowMenuPopup] = React.useState(false);
  return (
    <>
      {/* BOTON HAMBURGUESA - solo movil */}
      <div className="flex lg:hidden">
        <button className="cursor-pointer p-1" onClick={() => setShowMenuPopup(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* POPUP MENU MOVIL */}
      <div
        className={`fixed top-0 left-0 right-0 w-full bg-white dark:bg-zinc-950 z-[90] transition-all duration-500 ${
          showMenuPopup ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"
        } flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-6">
          <Image
            priority
            src="/images/hero-images/logo-family-love.png"
            className="w-24"
            width={300}
            height={150}
            alt="Logo Family Love"
          />
          <Link href="/" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Inicio</Link>
            <Link href="/noticias" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Noticias</Link>
          <Link href="/quienes-somos" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Quiénes Somos</Link>
          <Link href="/proyecto" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Proyectos</Link>
          <Link href="/programas" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Programas</Link>
          <Link href="/voluntariado" className="font-bold text-gray-900 dark:text-white text-xl" onClick={() => setShowMenuPopup(false)}>Voluntariado</Link>
        </div>
        <button className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowMenuPopup(false)}>
          <X className="w-7 h-7" />
        </button>
      </div>
      {/* MENU DESKTOP */}
      <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <Link href="/noticias" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Noticias</Link>
        <Link href="/quienes-somos" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Quiénes Somos</Link>
        <Link href="/proyecto" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Proyectos</Link>
        <Link href="/programas" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Programas</Link>
        <Link href="/voluntariado" className="text-base font-bold text-gray-900 px-4 py-2 rounded-md hover:bg-[#73eafe]/20 hover:text-[#0271bd] transition-all duration-200">Voluntariado</Link>
      </div>
    </>
  );
}