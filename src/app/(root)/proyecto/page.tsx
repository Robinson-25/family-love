"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const proyectos = [
  {
    id: 1,
    titulo: "Regalando Sonrisas con Family Love - Huancayo",
    fecha: "09 febrero 2025",
    resumen:
      "En nuestra 2da Campaña Navideña 2024, Family Love llevó el espíritu navideño a las calles de Huancayo, compartiendo momentos de alegría, esperanza y solidaridad con familias en situación de vulnerabilidad.",
    descripcion: `En nuestra 2da Campaña Navideña 2024, realizada el pasado 23 de diciembre, Family Love llevó el espíritu navideño a las calles de Huancayo, compartiendo momentos de alegría, esperanza y solidaridad con familias en situación de vulnerabilidad.

Durante esta jornada especial, entregamos alimentos, ropa y juguetes a niños, adultos y adultos mayores, brindando no solo abrigo y sustento, sino también abrazos, sonrisas y palabras de aliento.

Conscientes de la difícil situación que enfrentan muchos ancianos en nuestra comunidad, nos aseguramos de que recibieran una canasta de alimentos básicos, llevándoles un poco de tranquilidad y bienestar en estas fechas especiales.

Ver la felicidad en los rostros de los niños al recibir un juguete, la gratitud de los adultos al recibir ropa abrigadora y la emoción de los ancianos al recibir compañía y alimentos, fue el mayor regalo de todos.

Nada de esto habría sido posible sin el esfuerzo y dedicación de nuestros voluntarios, auspiciadores y donantes. Juntos demostramos que un pequeño gesto puede transformar vidas.`,
    imagen: "/images/hero-images/h2.webp",
    fotos: [
      "/images/hero-images/imagen1.jpg",
      "/images/hero-images/imagen2.jpg",
      "/images/hero-images/imagen3.jpg",
    ],
    video: "/images/hero-images/video1.mp4",
    etiqueta: "Campaña Navideña",
    color: "from-rose-500 to-red-600",
  },
  {
    id: 2,
    titulo: "Campaña Navideña en Ullusca – 2024",
    fecha: "20 diciembre 2024",
    resumen:
      "La magia de la Navidad iluminó el centro poblado de Ullusca y sus cuatro barrios gracias al esfuerzo y compromiso de Family Love.",
    descripcion: `La magia de la Navidad iluminó el centro poblado de Ullusca y sus cuatro barrios: Barrio Centro, Huaylas, Barranco y Retamayo, gracias al esfuerzo y compromiso de Family Love.

Esta campaña navideña reunió a voluntarios comprometidos que llevaron alegría, esperanza y apoyo a las familias más necesitadas de la comunidad. Durante la jornada, realizamos actividades recreativas, dinámicas para niños y adultos, entrega de regalos, donaciones, chocolatada y momentos llenos de amor y unión.

Nada de esto habría sido posible sin el valioso apoyo de nuestros voluntarios, auspiciadores y donantes, cuyo esfuerzo y generosidad marcaron la diferencia en muchas vidas.

Queremos hacer un reconocimiento especial a nuestros auspiciadores: I.E.P. San Antonio María Claret, Dr. Alex Sinche y el Diario Primicia, por su invaluable respaldo y confianza en nuestra labor.

En Family Love, creemos que la Navidad es más que una fecha; es un momento para compartir, para dar sin esperar nada a cambio y para recordar que, con pequeños gestos de amor, podemos transformar vidas.`,
    imagen: "/images/hero-images/family love ullusca footo-67.webp",
    fotos: [
      "/images/hero-images/U1.webp",
      "/images/hero-images/U2.webp",
      "/images/hero-images/U3.webp",
      "/images/hero-images/U7.webp",
    ],
    video: "",
    etiqueta: "Campaña Navideña",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    titulo: "Renovando Estilo y Sonrisa",
    fecha: "29 octubre 2024",
    resumen:
      "La Asociación FAMILY LOVE, en colaboración con el Salón de Belleza Romy's y el CAM EsSalud, llevó a cabo una jornada especial en el Centro del Adulto Mayor Concepción.",
    descripcion: `La Asociación FAMILY LOVE, en colaboración con el Salón de Belleza Romy's y el CAM EsSalud, llevó a cabo una jornada especial el 29 de octubre en el Centro del Adulto Mayor Concepción.

Este evento combinó dos experiencias transformadoras: corte de cabello y risoterapia, brindando a los adultos mayores un espacio de renovación y bienestar.

A través de esta iniciativa, no solo realzamos la autoestima de nuestros adultos mayores, sino que también fomentamos en los futuros médicos el desarrollo de habilidades blandas como la empatía y la comunicación.

En FAMILY LOVE, seguimos apostando por actividades que generen impacto positivo y fortalezcan el lazo entre generaciones.`,
    imagen: "/images/hero-images/2 foto family-9.webp",
    fotos: [
      "/images/hero-images/renovacion.jpeg",
      "/images/hero-images/renovacion.webp",
      "/images/hero-images/renovacion1.webp",
    ],
    video: "",
    etiqueta: "Bienestar Social",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    titulo: "Taller de Risoterapia para Adultos Mayores – ONP",
    fecha: "18 octubre 2024",
    resumen:
      "La Asociación FAMILY LOVE realizó un exitoso Taller de Risoterapia en la Casa del Pensionista Yuyaq - Huancayo, promoviendo la risa como herramienta para mejorar la salud.",
    descripcion: `El 18 de octubre de 2024, la Asociación FAMILY LOVE realizó un exitoso Taller de Risoterapia en la Casa del Pensionista Yuyaq - Huancayo, gracias a la invitación de la ONP.

Este evento reunió a adultos mayores y estudiantes de medicina que también son clowns hospitalarios, promoviendo la risa como una herramienta para mejorar la salud física y emocional.

A través de dinámicas de clown y ejercicios de risoterapia, los adultos mayores experimentaron momentos de alegría y conexión, reduciendo el estrés y fortaleciendo su bienestar.

En FAMILY LOVE, seguimos comprometidos con iniciativas que transformen vidas y fortalezcan el vínculo entre generaciones a través del poder de la risa y la solidaridad.`,
    imagen: "/images/hero-images/taller.webp",
    fotos: [
      "/images/hero-images/taller.webp",
    ],
    video: "",
    etiqueta: "Salud y Bienestar",
    color: "from-emerald-500 to-teal-600",
  },
];

type Proyecto = (typeof proyectos)[0];

function VideoPlayer({ src }: { src: string }) {
  const [mostrar, setMostrar] = useState(false);
  return (
    <div className="mb-6">
      <h3 className="font-bold text-gray-800 mb-3">🎥 Video</h3>
      {!mostrar ? (
        <button
          onClick={() => setMostrar(true)}
          className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] text-white font-bold py-4 px-6 rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-300"
        >
          <span className="text-2xl">▶️</span>
          Ver video
        </button>
      ) : (
        <div className="flex justify-center">
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="rounded-2xl w-full max-w-[320px]"
            style={{ aspectRatio: "9/16" }}
          />
        </div>
      )}
    </div>
  );
}

function Modal({ proyecto, onClose }: { proyecto: Proyecto; onClose: () => void }) {
  const [fotoActiva, setFotoActiva] = useState(0);

  useEffect(() => {
    if (proyecto.fotos.length <= 1) return;
    const interval = setInterval(() => {
      setFotoActiva((prev) => (prev + 1) % proyecto.fotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [proyecto.fotos.length]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${proyecto.titulo} - Family Love`);

  const redes = [
    { nombre: "Facebook", color: "bg-[#1877F2]", icono: "f", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { nombre: "WhatsApp", color: "bg-[#25D366]", icono: "W", url: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}` },
    { nombre: "TikTok", color: "bg-black", icono: "T", url: `https://www.tiktok.com/` },
    { nombre: "Instagram", color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400", icono: "ig", url: `https://www.instagram.com/` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 pb-4 px-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className={`bg-gradient-to-r ${proyecto.color} p-6 rounded-t-3xl relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white font-bold text-lg transition">
            ✕
          </button>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            {proyecto.etiqueta}
          </span>
          <h2 className="text-2xl font-extrabold text-white leading-tight pr-10">{proyecto.titulo}</h2>
          <p className="text-white/70 text-sm mt-2">📅 {proyecto.fecha}</p>
        </div>

        <div className="p-6">
          {proyecto.fotos.length > 0 && (
            <div className="mb-6">
              <div className="relative w-full rounded-2xl overflow-hidden mb-3">
                <Image
                  src={proyecto.fotos[fotoActiva]}
                  alt={proyecto.titulo}
                  width={800}
                  height={600}
                  className="object-contain w-full"
                />Ñ
              </div>
              {proyecto.fotos.length > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                  {proyecto.fotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFotoActiva(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${fotoActiva === i ? "bg-[#2251a3] scale-125" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {proyecto.video && <VideoPlayer src={proyecto.video} />}

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">📋 Descripción</h3>
            {proyecto.descripcion.split("\n\n").map((parrafo, i) => (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">{parrafo}</p>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-sm font-semibold text-gray-500 mb-3 tracking-wide uppercase">Compartir en redes</p>
            <div className="flex gap-3 flex-wrap">
              {redes.map((red) => (
                <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer"
                  className={`${red.color} text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition hover:scale-105`}>
                  <span className="font-bold">{red.icono}</span>
                  {red.nombre}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProyectoPage() {
  const [proyectoActivo, setProyectoActivo] = useState<Proyecto | null>(null);

  return (
    <main className="bg-white text-gray-800 font-sans">
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

      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Lo que hemos hecho</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Proyectos Realizados</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {proyectos.map((p) => (
            <button key={p.id} onClick={() => setProyectoActivo(p)}
              className="group text-left bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full h-48 overflow-hidden">
                <Image src={p.imagen} alt={p.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-40`} />
                <span className="absolute top-3 left-3 bg-white/90 text-[#1a3a6b] text-xs font-bold px-3 py-1 rounded-full">{p.etiqueta}</span>
              </div>
              <div className="p-6">
                <p className="text-[#2251a3] text-xs font-semibold mb-2">📅 {p.fecha}</p>
                <h3 className="font-extrabold text-gray-900 text-lg mb-2 leading-tight">{p.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{p.resumen}</p>
                <div className="mt-4 flex items-center gap-2 text-[#2251a3] font-semibold text-sm">
                  Ver más <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── ALIANZAS ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Quienes nos respaldan</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Alianzas y Crecimiento Institucional</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              En su proceso de crecimiento, Family Love contó con el respaldo de aliados estratégicos y auspiciadores que confiaron en nuestra misión social.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {[
              "I.E.P. San Antonio María Claret",
              "Dr. Alex Sinche",
              "Diario Primicia",
              "Ancosur Inmobiliaria",
              "ROMY'S Power and Style",
              "Mr. Juerga",
              "Joel Oroncoy",
              "Miluscka Makeup Pro & Medical Beauty",
              "Rock Centro",
              "Férnix Moda",
              "Familia Santo Rojas",
              "Rosbal",
              "Yessia Studio",
            ].map((aliado, i) => (
              <span
                key={i}
                className="bg-white border-2 border-[#1a3a6b] text-[#1a3a6b] font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-[#1a3a6b] hover:text-white transition-all duration-300 text-sm"
              >
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

      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">¡Únete a nuestro equipo!</h2>
          <p className="text-white/80 mb-8 leading-relaxed">Sé parte del cambio. Juntos podemos llevar alegría y esperanza a más familias.</p>
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