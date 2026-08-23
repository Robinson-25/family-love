import Link from "next/link";
import { FolderKanban, Newspaper, Plus } from "lucide-react";
import { db } from "@/lib/db";

async function getConteos() {
  try {
    const [proyectos]: any = await db.execute(
      "SELECT COUNT(*) as total FROM proyecto"
    );
    const [noticias]: any = await db.execute(
      "SELECT COUNT(*) as total FROM noticia"
    );
    return {
      proyectos: proyectos[0]?.total ?? 0,
      noticias: noticias[0]?.total ?? 0,
    };
  } catch {
    return { proyectos: 0, noticias: 0 };
  }
}

export default async function PanelAdminPage() {
  const { proyectos, noticias } = await getConteos();

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
        Bienvenido al panel 👋
      </h2>
      <p className="text-gray-500 mb-8">
        Desde aquí puedes publicar y editar los Proyectos Realizados y las Noticias de la página web.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-[#2251a3]" />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">{proyectos}</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Proyectos Realizados</h3>
          <p className="text-sm text-gray-500 mb-4">
            Publicados actualmente en la web, organizados por año.
          </p>
          <div className="flex gap-2">
            <Link
              href="/panel-administracion/proyectos"
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              Ver todos
            </Link>
            <Link
              href="/panel-administracion/proyectos/nuevo"
              className="flex-1 flex items-center justify-center gap-1 bg-[#1a3a6b] hover:bg-[#2251a3] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Nuevo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-[#2251a3]" />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">{noticias}</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Noticias</h3>
          <p className="text-sm text-gray-500 mb-4">
            Publicadas actualmente en la sección de Noticias.
          </p>
          <div className="flex gap-2">
            <Link
              href="/panel-administracion/noticias"
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              Ver todas
            </Link>
            <Link
              href="/panel-administracion/noticias/nuevo"
              className="flex-1 flex items-center justify-center gap-1 bg-[#1a3a6b] hover:bg-[#2251a3] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Nueva
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
