"use client";

import Image from "next/image";
import { useState, useEffect } from "react";


type Proyecto = {
  id: number;
  titulo: string;
  fecha: string;
  anio: number;
  resumen: string;
  descripcion: string;
  imagen: string;
  fotos: string[];
  video: string;
  etiqueta: string;
  color: string;
  emoji: string;
};

function VideoPlayer({ src }: { src: string }) {
  const [mostrar, setMostrar] = useState(false);
  return (
    <div className="mb-4">
      {!mostrar ? (
        <button
          onClick={() => setMostrar(true)}
          className="flex items-center justify-center gap-3 w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 group"
        >
          <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform text-sm">
            ▶
          </span>
          Ver video del evento
        </button>
      ) : (
        <div className="flex justify-center">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="rounded-2xl w-full max-w-[240px] shadow-xl"
            style={{ aspectRatio: "9/16" }}
          />
        </div>
      )}
    </div>
  );
}

function Modal({
  proyecto,
  onClose,
}: {
  proyecto: Proyecto;
  onClose: () => void;
}) {
  const [fotoActiva, setFotoActiva] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(true), 10);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (proyecto.fotos.length <= 1) return;
    const interval = setInterval(() => {
      setFotoActiva((prev) => (prev + 1) % proyecto.fotos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [proyecto.fotos.length]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${proyecto.titulo} - Family Love`);

  const redes = [
    { nombre: "Facebook", bg: "#1877F2", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { nombre: "WhatsApp", bg: "#25D366", url: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}` },
    { nombre: "Instagram", bg: "#E1306C", url: `https://www.instagram.com/` },
    { nombre: "TikTok", bg: "#000000", url: `https://www.tiktok.com/` },
  ];

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-300 ${
        visible ? "bg-black/65 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "calc(100vh - 100px)" }}
        className={`bg-white w-full mx-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 md:max-w-4xl ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* IZQUIERDA: Galería */}
        <div className="relative md:w-[45%] h-64 md:h-auto flex-shrink-0 bg-gray-100">
          <Image
            src={proyecto.fotos[fotoActiva]}
            alt={proyecto.titulo}
            fill
            className="object-cover"
          />
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow">
            {proyecto.emoji} {proyecto.etiqueta}
          </span>

          {proyecto.fotos.length > 1 && (
            <>
              <button
                onClick={() => setFotoActiva((p) => (p - 1 + proyecto.fotos.length) % proyecto.fotos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-lg transition-all"
              >‹</button>
              <button
                onClick={() => setFotoActiva((p) => (p + 1) % proyecto.fotos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-lg transition-all"
              >›</button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                {proyecto.fotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFotoActiva(i)}
                    className={`transition-all duration-300 rounded-full h-2 ${fotoActiva === i ? "w-5 bg-white" : "w-2 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* DERECHA: Contenido */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={`bg-gradient-to-r ${proyecto.color} px-6 py-4 relative flex-shrink-0`}>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 bg-white/25 hover:bg-white/50 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all hover:rotate-90 duration-300"
            >✕</button>
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
              📅 {proyecto.fecha}
            </p>
            <h2 className="text-lg font-extrabold text-white leading-tight pr-10">
              {proyecto.titulo}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {proyecto.video && <VideoPlayer src={proyecto.video} />}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
                📋 Sobre este proyecto
              </p>
              <div className="space-y-2">
                {proyecto.descripcion.split("\n\n").map((parrafo, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{parrafo}</p>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Compartir</p>
              <div className="flex gap-2 flex-wrap">
                {redes.map((red) => (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: red.bg }}
                    className="text-white text-xs font-bold px-4 py-2 rounded-full hover:opacity-80 hover:scale-105 transition-all duration-200"
                  >{red.nombre}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProyectoPage() {
  const [proyectoActivo, setProyectoActivo] = useState<Proyecto | null>(null);
  const [anoActivo, setAnoActivo] = useState<string>("");
  const [proyectosPorAno, setProyectosPorAno] = useState<Record<string, Proyecto[]>>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();
        const proyectos: Proyecto[] = data.proyectos || [];

        const agrupados: Record<string, Proyecto[]> = {};
        proyectos.forEach((p) => {
          const anio = String(p.anio);
          if (!agrupados[anio]) agrupados[anio] = [];
          agrupados[anio].push(p);
        });

        setProyectosPorAno(agrupados);

        const anosDisponibles = Object.keys(agrupados).sort((a, b) => Number(b) - Number(a));
        if (anosDisponibles.length > 0) setAnoActivo(anosDisponibles[0]);
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProyectos();
  }, []);

  const anos = Object.keys(proyectosPorAno).sort((a, b) => Number(b) - Number(a));
  const proyectosDelAno = proyectosPorAno[anoActivo] || [];

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#73eafe] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Nuestro impacto
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Proyectos</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Cada acción cuenta. Conoce el trabajo que hacemos por nuestra comunidad.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* SECCIÓN PROYECTOS CON TABS POR AÑO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">
            Lo que hemos hecho
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Proyectos Realizados</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Cada proyecto es una historia de amor, esfuerzo y comunidad.
          </p>
        </div>

        {cargando ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2251a3] rounded-full animate-spin" />
          </div>
        ) : anos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Todavía no hay proyectos publicados.</p>
          </div>
        ) : (
          <>
            {/* TABS DE AÑOS */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-gray-100 rounded-2xl p-1.5 gap-1">
                {anos.map((ano) => (
                  <button
                    key={ano}
                    onClick={() => setAnoActivo(ano)}
                    className={`relative px-8 py-3 rounded-xl font-extrabold text-lg transition-all duration-300 ${
                      anoActivo === ano
                        ? "bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] text-white shadow-lg scale-105"
                        : "text-gray-500 hover:text-[#2251a3] hover:bg-white"
                    }`}
                  >
                    {ano}
                    {anoActivo === ano && (
                      <span className="absolute -top-2 -right-2 bg-[#73eafe] text-[#1a3a6b] text-xs font-bold px-2 py-0.5 rounded-full">
                        {proyectosPorAno[ano].length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Línea de tiempo / contador */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]" />
              <span className="text-sm text-gray-400 font-semibold">
                {proyectosDelAno.length} proyectos en {anoActivo}
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[100px]" />
            </div>

            {/* GRID DE CARDS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {proyectosDelAno.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProyectoActivo(p)}
                  className="group text-left bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={p.imagen}
                      alt={p.titulo}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-[#1a3a6b] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {p.emoji} {p.etiqueta}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      📅 {p.fecha}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-gray-900 text-base mb-2 leading-tight group-hover:text-[#2251a3] transition-colors duration-300 line-clamp-2">
                      {p.titulo}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                      {p.resumen}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`bg-gradient-to-r ${p.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                        {p.etiqueta}
                      </span>
                      <span className="flex items-center gap-1 text-[#2251a3] font-bold text-sm group-hover:gap-2 transition-all duration-300">
                        Ver más <span>→</span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ALIANZAS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">
              Quienes nos respaldan
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
              Alianzas y Crecimiento Institucional
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              En su proceso de crecimiento, Family Love contó con el respaldo de aliados estratégicos y auspiciadores que confiaron en nuestra misión social.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {[
              "I.E.P. San Antonio María Claret","Dr. Alex Sinche","Diario Primicia",
              "Ancosur Inmobiliaria","ROMY'S Power and Style","Mr. Juerga",
              "Joel Oroncoy","Miluscka Makeup Pro & Medical Beauty","Rock Centro",
              "Férnix Moda","Familia Santo Rojas","Rosbal","Yessia Studio",
            ].map((aliado, i) => (
              <span key={i} className="bg-white border-2 border-[#1a3a6b] text-[#1a3a6b] font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-[#1a3a6b] hover:text-white transition-all duration-300 text-sm">
                {aliado}
              </span>
            ))}
          </div>
          <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] rounded-3xl p-8 text-center text-white">
            <p className="text-lg leading-relaxed text-white/90 max-w-3xl mx-auto">
              Actualmente, Family Love continúa consolidándose como una organización juvenil con estructura formal, visión de crecimiento y compromiso sostenido con el desarrollo social y humano.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">¡Únete a nuestro equipo!</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Sé parte del cambio. Juntos podemos llevar alegría y esperanza a más familias.
          </p>
          <a href="/voluntariado" className="inline-block bg-[#73eafe] text-[#1a3a6b] font-bold px-8 py-3 rounded-full hover:bg-white transition hover:scale-105">
            Quiero ser voluntario →
          </a>
        </div>
      </section>

      {proyectoActivo && (
        <Modal proyecto={proyectoActivo} onClose={() => setProyectoActivo(null)} />
      )}
    </main>
  );
}