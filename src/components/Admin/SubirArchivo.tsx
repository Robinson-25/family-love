"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Video as VideoIcon } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  label: string;
  tipo: "imagen" | "video";
  valor: string;
  onCambio: (url: string) => void;
};

export default function SubirArchivo({ label, tipo, valor, onCambio }: Props) {
  const [subiendo, setSubiendo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const manejarArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al subir el archivo");
        return;
      }

      onCambio(data.url);
      toast.success(`${tipo === "imagen" ? "Imagen" : "Video"} subido correctamente`);
    } catch (error) {
      toast.error("Error al subir el archivo. Intenta de nuevo.");
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>

      {valor ? (
        <div className="relative w-full max-w-xs">
          {tipo === "imagen" ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
              <Image src={valor} alt={label} fill className="object-cover" />
            </div>
          ) : (
            <video src={valor} controls className="w-full max-w-[200px] rounded-xl border border-gray-200" />
          )}
          <button
            type="button"
            onClick={() => onCambio("")}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full max-w-xs h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#2251a3] hover:bg-gray-50 transition-colors">
          {subiendo ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#2251a3]" />
          ) : (
            <>
              {tipo === "imagen" ? (
                <Upload className="w-6 h-6 text-gray-400 mb-1" />
              ) : (
                <VideoIcon className="w-6 h-6 text-gray-400 mb-1" />
              )}
              <span className="text-sm text-gray-500">
                Subir {tipo === "imagen" ? "imagen" : "video"}
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={tipo === "imagen" ? "image/*" : "video/*"}
            className="hidden"
            onChange={manejarArchivo}
            disabled={subiendo}
          />
        </label>
      )}
    </div>
  );
}
