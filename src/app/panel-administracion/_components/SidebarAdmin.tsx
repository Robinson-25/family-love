"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Newspaper, Home } from "lucide-react";

const links = [
  { href: "/panel-administracion", label: "Inicio", icon: LayoutDashboard, exact: true },
  { href: "/panel-administracion/proyectos", label: "Proyectos Realizados", icon: FolderKanban },
  { href: "/panel-administracion/noticias", label: "Noticias", icon: Newspaper },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-[#1a3a6b] lg:min-h-screen lg:sticky lg:top-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white font-extrabold text-lg">Panel de Administración</h1>
        <p className="text-white/50 text-xs mt-1">Family Love</p>
      </div>
      <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto">
        {links.map((link) => {
          const activo = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                activo
                  ? "bg-white text-[#1a3a6b]"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/10 mt-2 lg:mt-4 lg:border-t lg:border-white/10 lg:pt-4"
        >
          <Home className="w-4 h-4" />
          Volver al sitio
        </Link>
      </nav>
    </aside>
  );
}
