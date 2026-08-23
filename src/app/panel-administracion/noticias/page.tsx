"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type Noticia = {
  id: number;
  titulo: string;
  fecha: string;
  imagen: string;
};

export default function ListaNoticiasAdmin() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/noticias");
      const data = await res.json();
      setNoticias(data.noticias || []);
    } catch {
      toast.error("No se pudieron cargar las noticias");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id: number, titulo: string) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar noticia?",
      text: `Se eliminará "${titulo}" de la página web. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const res = await fetch(`/api/noticias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Noticia eliminada");
      setNoticias((prev) => prev.filter((n) => n.id !== id));
    } catch {
      toast.error("No se pudo eliminar la noticia");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Noticias</h2>
          <p className="text-gray-500 text-sm mt-1">Gestiona las noticias que se muestran en la web.</p>
        </div>
        <Link
          href="/panel-administracion/noticias/nuevo"
          className="flex items-center gap-2 bg-[#1a3a6b] hover:bg-[#2251a3] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva noticia
        </Link>
      </div>

      {cargando ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#2251a3]" />
        </div>
      ) : noticias.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Todavía no has publicado ninguna noticia.</p>
          <Link
            href="/panel-administracion/noticias/nuevo"
            className="inline-block mt-4 text-[#2251a3] font-semibold hover:underline"
          >
            Crear la primera noticia →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {noticias.map((n) => (
            <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative w-full h-36">
                <Image src={n.imagen} alt={n.titulo} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 font-semibold mb-1">{n.fecha}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2">{n.titulo}</h3>
                <div className="flex gap-2">
                  <Link
                    href={`/panel-administracion/noticias/${n.id}/editar`}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </Link>
                  <button
                    onClick={() => eliminar(n.id, n.titulo)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
