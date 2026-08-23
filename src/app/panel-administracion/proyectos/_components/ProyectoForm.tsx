"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Save } from "lucide-react";
import SubirArchivo from "@/components/Admin/SubirArchivo";
import SubirGaleria from "@/components/Admin/SubirGaleria";

export type ProyectoData = {
  id?: number;
  titulo: string;
  fecha: string;
  anio: string;
  resumen: string;
  descripcion: string;
  imagen: string;
  fotos: string[];
  video: string;
  etiqueta: string;
  emoji: string;
};

const vacio: ProyectoData = {
  titulo: "",
  fecha: "",
  anio: new Date().getFullYear().toString(),
  resumen: "",
  descripcion: "",
  imagen: "",
  fotos: [],
  video: "",
  etiqueta: "",
  emoji: "💙",
};

export default function ProyectoForm({
  inicial,
}: {
  inicial?: ProyectoData;
}) {
  const router = useRouter();
  const [datos, setDatos] = useState<ProyectoData>(inicial || vacio);
  const [guardando, setGuardando] = useState(false);

  const esEdicion = !!inicial?.id;

  const actualizar = (campo: keyof ProyectoData, valor: any) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!datos.titulo || !datos.fecha || !datos.anio || !datos.resumen || !datos.descripcion || !datos.imagen || !datos.etiqueta) {
      toast.error("Completa todos los campos obligatorios y sube al menos la imagen principal");
      return;
    }

    setGuardando(true);
    try {
      const url = esEdicion
        ? `/api/proyectos/${inicial!.id}`
        : "/api/proyectos";
      const method = esEdicion ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datos,
          fotos: datos.fotos.length ? datos.fotos : [datos.imagen],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Ocurrió un error al guardar");
        return;
      }

      toast.success(esEdicion ? "Proyecto actualizado" : "Proyecto publicado");
      router.push("/panel-administracion/proyectos");
      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error al guardar. Intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardar} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Título del proyecto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={datos.titulo}
          onChange={(e) => actualizar("titulo", e.target.value)}
          placeholder='Ej: Repartiendo Sonrisas y Sueños – CAR Virgen de Lourdes'
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Fecha (como se muestra en la web) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={datos.fecha}
            onChange={(e) => actualizar("fecha", e.target.value)}
            placeholder="Ej: 01 marzo 2025"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Año del proyecto <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={datos.anio}
            onChange={(e) => actualizar("anio", e.target.value)}
            placeholder="Ej: 2025"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
          />
          <p className="text-xs text-gray-400 mt-1">
            Este es el año en el que aparecerá agrupado (pestañas 2025, 2024, etc.)
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Etiqueta / categoría <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={datos.etiqueta}
            onChange={(e) => actualizar("etiqueta", e.target.value)}
            placeholder="Ej: Jornada Solidaria"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Emoji (opcional)
          </label>
          <input
            type="text"
            value={datos.emoji}
            onChange={(e) => actualizar("emoji", e.target.value)}
            placeholder="🤡"
            maxLength={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Resumen corto (aparece en la tarjeta del listado) <span className="text-red-500">*</span>
        </label>
        <textarea
          value={datos.resumen}
          onChange={(e) => actualizar("resumen", e.target.value)}
          rows={2}
          placeholder="Un resumen breve de 1 a 2 líneas..."
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Descripción completa (aparece al abrir el proyecto) <span className="text-red-500">*</span>
        </label>
        <textarea
          value={datos.descripcion}
          onChange={(e) => actualizar("descripcion", e.target.value)}
          rows={6}
          placeholder="Cuenta la historia completa del proyecto..."
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2251a3]"
        />
      </div>

      <SubirArchivo
        label="Imagen principal (portada) *"
        tipo="imagen"
        valor={datos.imagen}
        onCambio={(url) => actualizar("imagen", url)}
      />

      <SubirGaleria
        label="Galería de fotos adicionales (opcional)"
        valores={datos.fotos}
        onCambio={(urls) => actualizar("fotos", urls)}
      />

      <SubirArchivo
        label="Video del evento (opcional)"
        tipo="video"
        valor={datos.video}
        onCambio={(url) => actualizar("video", url)}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.push("/panel-administracion/proyectos")}
          className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={guardando}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-[#1a3a6b] hover:bg-[#2251a3] text-white transition-colors disabled:opacity-60"
        >
          {guardando ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {esEdicion ? "Guardar cambios" : "Publicar proyecto"}
        </button>
      </div>
    </form>
  );
}
