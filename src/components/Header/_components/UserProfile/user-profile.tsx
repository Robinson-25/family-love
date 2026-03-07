"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Mail,
  User,
  ScanEye,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu modal={false} onOpenChange={() => {}}>
      <DropdownMenuTrigger className=" data-[state=open]:rotate-child-180 outline-none rounded-md">
        <div className="flex items-center gap-2">
          <div className=" data-[state=open]:bg-black">
            <div
              className={`text-lg font-medium select-none rounded-full ${
                session?.user.image ? "" : "border border-zinc-400"
              } h-9 w-9 flex items-center justify-center`}
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
                      <p>
                        {session.user?.name &&
                          session.user?.name[0].toUpperCase()}
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </>
              )}
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 child transition-all duration-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56`}>
        {session ? (
          <>
            <DropdownMenuLabel className="font-semibold">
              Mi Cuenta
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/perfil`}
                className="w-full h-full flex gap-2 items-center text-sm"
              >
                <User className="w-4 h-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            {session.user.role === "admin" && (
              <DropdownMenuItem>
                <Link
                  href={`/panel-administracion`}
                  className="w-full h-full flex gap-2 items-center text-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div
                onClick={() => {
                  signOut();
                }}
                className="flex items-center w-full h-full"
              >
                <LogOut className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-red-400">Cerrar Sesión</span>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="font-semibold">
              Inicia sesión o registrate
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/login`}
                className="w-full h-full flex gap-2 items-center text-sm"
              >
                <ScanEye className="w-4 h-4" />
                Iniciar Sesión
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={`/register`}
                className="flex gap-2 items-center w-full h-full"
              >
                <LogOut className="h-4 w-4" />
                <span className="">Registrarse</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
