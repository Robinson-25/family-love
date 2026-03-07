"use client";

import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlarmSmoke,
  Anvil,
  BedSingle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  HandPlatter,
  Home,
  Hotel,
  Plus,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./sidebar.module.css";
import ToggleTheme from "@/components/ToggleTheme/toggle-theme";

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="fixed lg:relative z-10">
      <aside
        className={`fixed lg:sticky ${
          showSideBar ? "w-64" : "w-0 md:w-10"
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
          className={`pt-1 flex flex-col gap-3 items-center justify-center text-sm ${
            showSideBar ? "opacity-100 w-full" : "opacity-0 w-0"
          } transition-all duration-700`}
        >
          <div
            className={` font-medium select-none rounded-full ${
              session?.user.image ? "" : "border border-zinc-400"
            } h-16 w-16 flex flex-col items-center justify-center`}
          >
            {session ? (
              <>
                {session.user.image ? (
                  <>
                    <Image
                      className="w-full h-full rounded-full"
                      src={session.user.image}
                      width={100}
                      height={100}
                      alt="Foto de perfil"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-xl">
                      {session.user?.name && session.user?.name[0]}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <User className="w-8 h-8" strokeWidth={1} />
              </>
            )}
          </div>
          <p className="text-sm text-nowrap">Hola, {session?.user.name}</p>
        </div>

        <nav className="w-full pt-3">
          <ul className="w-full">
            <li className="w-full">
              <LinkItem
                setShowSideBar={setShowSideBar}
                href={`/panel-administracion`}
                className={`flex gap-3 items-center text-gold-hr-dark dark:text-gold-hr hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full h-11 px-3 text-sm font-semibold ${
                  pathname === "/panel-administracion"
                    ? "bg-zinc-300 dark:bg-zinc-900"
                    : ""
                }`}
              >
                <Home
                  className="min-w-4 min-h-4 max-w-4 max-h-4"
                  strokeWidth={1.5}
                />
                <p>Principal</p>
              </LinkItem>
            </li>
            <Accordion
              type="single"
              collapsible
              disabled={!showSideBar}
              className="w-full"
            >
              <li>
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full px-3 h-11">
                    <div className="flex gap-3 items-center">
                      <Hotel className="w-4 h-4" strokeWidth={1.5} />
                      <p>Sedes</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <ul>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/sedes/all`}
                          className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/sedes/all"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                          <p className="text-sm">Ver Todas</p>
                        </LinkItem>
                      </li>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/sedes/new`}
                          className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/sedes/new"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                          <p className="text-sm">Crear</p>
                        </LinkItem>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
              <li className="w-full">
                <AccordionItem value="item-2" className="border-none">
                  <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full px-3 h-11">
                    <div className="flex gap-3 items-center">
                      <BedSingle className="w-4 h-4" strokeWidth={1.5} />
                      <p>Habitaciones</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <ul>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/habitaciones/all`}
                          className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname ===
                            "/panel-administracion/habitaciones/all"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                          <p className="text-sm">Ver Todas</p>
                        </LinkItem>
                      </li>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/habitaciones/new`}
                          className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname ===
                            "/panel-administracion/habitaciones/new"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                          <p className="text-sm">Crear</p>
                        </LinkItem>
                      </li>
                      <li>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item01" className="border-none">
                            <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                              <div className="flex gap-3 items-center">
                                <Anvil
                                  strokeWidth={1.5}
                                  className="w-3.5 h-3.5"
                                />
                                Tipos de Habitación
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-0">
                              <ul>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/categorias`}
                                    className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/categorias"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Eye
                                      className="w-3.5 h-3.5"
                                      strokeWidth={2}
                                    />
                                    <p className="text-sm">Ver Todas</p>
                                  </LinkItem>
                                </li>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/categorias/new`}
                                    className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/categorias/new"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Plus
                                      className="w-3.5 h-3.5"
                                      strokeWidth={3}
                                    />
                                    <p className="text-sm">Crear</p>
                                  </LinkItem>
                                </li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item02" className="border-none">
                            <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                              <div className="flex gap-3 items-center">
                                <AlarmSmoke
                                  strokeWidth={1.5}
                                  className="w-3.5 h-3.5"
                                />
                                Comodidades
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-0">
                              <ul>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/comodidades`}
                                    className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/comodidades"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Eye
                                      className="w-3.5 h-3.5"
                                      strokeWidth={2}
                                    />
                                    <p className="text-sm">Ver Todas</p>
                                  </LinkItem>
                                </li>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/comodidades/new`}
                                    className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/comodidades/new"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Plus
                                      className="w-3.5 h-3.5"
                                      strokeWidth={3}
                                    />
                                    <p className="text-sm">Crear</p>
                                  </LinkItem>
                                </li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item03" className="border-none">
                            <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                              <div className="flex gap-3 items-center">
                                <HandPlatter
                                  strokeWidth={1.5}
                                  className="w-3.5 h-3.5"
                                />
                                Servicios
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-0">
                              <ul>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/servicios/all`}
                                    className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/servicios/all"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Eye
                                      className="w-3.5 h-3.5"
                                      strokeWidth={2}
                                    />
                                    <p className="text-sm">Ver Todos</p>
                                  </LinkItem>
                                </li>
                                <li>
                                  <LinkItem
                                    setShowSideBar={setShowSideBar}
                                    href={`/panel-administracion/habitaciones/servicios/new`}
                                    className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                                      pathname ===
                                      "/panel-administracion/habitaciones/servicios/new"
                                        ? "bg-zinc-300 dark:bg-zinc-900"
                                        : ""
                                    }`}
                                  >
                                    <Plus
                                      className="w-3.5 h-3.5"
                                      strokeWidth={3}
                                    />
                                    <p className="text-sm">Crear</p>
                                  </LinkItem>
                                </li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
              <li className="w-full">
                <AccordionItem value="item-3" className="border-none">
                  <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full px-3 h-11">
                    <div className="flex gap-3 items-center">
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                      <p>Usuarios</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <ul>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/users/all`}
                          className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/users/all"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                          <p className="text-sm">Ver Todos</p>
                        </LinkItem>
                      </li>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/users/new`}
                          className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/users/new"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                          <p className="text-sm">Crear</p>
                        </LinkItem>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
              <li className="w-full">
                <AccordionItem value="item-4" className="border-none">
                  <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-900 w-full px-3 h-11">
                    <div className="flex gap-3 items-center">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      <p>Reservas</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <ul>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/reservas/all`}
                          className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/reservas/all"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                          <p className="text-sm">Ver Todas</p>
                        </LinkItem>
                      </li>
                      <li>
                        <LinkItem
                          setShowSideBar={setShowSideBar}
                          href={`/panel-administracion/reservas/new`}
                          className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-200 dark:hover:bg-zinc-900 ${
                            pathname === "/panel-administracion/reservas/new"
                              ? "bg-zinc-300 dark:bg-zinc-900"
                              : ""
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                          <p className="text-sm">Crear</p>
                        </LinkItem>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
            </Accordion>

            <li className="flex items-center justify-center pt-5 pb-10">
              <ToggleTheme />
            </li>
          </ul>
        </nav>
      </aside>

      <div>
        {showSideBar ? (
          <div
            className={`fixed z-[20] top-0 left-[256px] w-9 h-9 cursor-pointer bg-gold-hr-dark dark:bg-gold-hr-dark rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(false)}
          >
            <ChevronLeft strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        ) : (
          <div
            className={`fixed z-[20] top-0 left-0 md:left-10 w-9 h-9 cursor-pointer bg-gold-hr-dark dark:bg-gold-hr-dark rounded-r-md flex items-center justify-center transition-all duration-700`}
            onClick={() => setShowSideBar(true)}
          >
            <ChevronRight strokeWidth={1.5} className="text-white w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;

const LinkItem = ({
  children,
  href,
  className,
  setShowSideBar,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  setShowSideBar: Function;
}) => {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        console.log(window.innerWidth);
        if (window.innerWidth >= 1280) {
          setShowSideBar(true);
        } else {
          setShowSideBar(false);
        }
      }}
    >
      {children}
    </Link>
  );
};
