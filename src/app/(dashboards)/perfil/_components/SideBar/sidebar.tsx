"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight, Home, User } from "lucide-react";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import ToggleTheme from "@/components/ToggleTheme/toggle-theme";

const SideBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <aside
      className={`fixed lg:sticky ${
        showSideBar ? "w-56" : "w-0 md:w-12"
      } pt-6 pb-8 top-0 bottom-0 z-[10] bg-zinc-100 dark:bg-zinc-950 overflow-scroll flex flex-col flex-none max-h-screen gap-3 min-h-screen ${
        showSideBar ? "dashboard-sidebar" : `${styles["hide-scrollbar"]}`
      } transition-all duration-700`}
    >
      <div
        className={`w-full flex items-center justify-center ${
          showSideBar ? "opacity-100 w-full" : "opacity-0 w-0"
        } text-nowrap`}
      >
        <Link href={"/"} className="flex text-sm gap-1.5 items-center">
          <ChevronLeft className="w-4 h-4" />
          <p>Volver al Home</p>
        </Link>
      </div>
      <div
        className={`pt-1 w-full ${
          showSideBar ? "opacity-100 w-full" : "opacity-0 w-0"
        } flex flex-col items-center justify-center gap-2 transition-all duration-500`}
      >
        <div>
          {session?.user.image ? (
            <div className="w-full flex items-center justify-center">
              <Image
                className="w-16 h-16 rounded-full"
                src={session.user.image}
                width={200}
                height={200}
                alt="Imagen de perfil"
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="w-16 h-16 rounded-full text-3xl font-normal border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                {session?.user.name ? session.user.name[0].toUpperCase() : ""}
              </p>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-nowrap">
          Hola, {session?.user.name}
        </p>
      </div>

      <nav
        className={`w-full pt-3 text-sm text-nowrap ${
          showSideBar ? "" : "pointer-events-none"
        }`}
      >
        <ul className="w-full">
          <li className="">
            <Link
              href={`/perfil`}
              className={`flex items-center gap-4 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 py-3 transition-all duration-200 ${
                pathname === "/perfil" ? "bg-zinc-300 dark:bg-zinc-800" : ""
              }`}
            >
              <Home className="min-w-4 min-h-4 w-4 h-4" strokeWidth={1.5} />
              <span>Principal</span>
            </Link>
          </li>
          <li className="">
            <Link
              href={`/perfil/${session?.user.name}`}
              className={`flex items-center gap-4 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 py-3 transition-all duration-200 ${
                pathname ===
                `/perfil/${encodeURIComponent(session?.user.name as string)}`
                  ? "bg-zinc-300 dark:bg-zinc-800"
                  : ""
              }`}
            >
              <User className="min-w-4 min-h-4 w-4 h-4" strokeWidth={1.5} />
              <span>Mi perfil</span>
            </Link>
          </li>
          <li className="">
            <Link
              href={`/perfil/reservas`}
              className={`flex items-center gap-4 px-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 py-3 transition-all duration-200 ${
                pathname === "/perfil/reservas"
                  ? "bg-zinc-300 dark:bg-zinc-800"
                  : ""
              }`}
            >
              <Bell className="min-w-4 min-h-4 w-4 h-4" strokeWidth={1.5} />
              <span>Mis reservas</span>
            </Link>
          </li>

          <li className="flex items-center justify-center pt-5 pb-10">
            <ToggleTheme />
          </li>
        </ul>
      </nav>

      <div>
        {showSideBar ? (
          <div
            className={`fixed z-[20] top-0 left-[224px] w-9 h-9 cursor-pointer bg-gold-hr-dark dark:bg-gold-hr-dark rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(false)}
          >
            <ChevronLeft strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        ) : (
          <div
            className={`fixed z-[20] top-0 left-0 md:left-12 w-9 h-9 cursor-pointer bg-gold-hr-dark dark:bg-gold-hr-dark rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(true)}
          >
            <ChevronRight strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
