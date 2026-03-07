import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { MapPin, Heart, Users, BookOpen, Star } from "lucide-react";
import { getHotelCenterByUrlSegment } from "@/db/hotel-center/get-by-url-segment";
import Link from "next/link";
import ContactEmailForm from "@/app/(root)/contacto/[hotelCenterId]/_components/ContactEmailForm/form";

const getData = async (urlSegment: string) => {
  const hotelCenter = await getHotelCenterByUrlSegment(urlSegment);
  return hotelCenter as HotelCenter;
};

const programas = [
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    titulo: "Acompañamiento Familiar",
    descripcion: "Brindamos apoyo emocional y orientación a familias en situación de vulnerabilidad, fortaleciendo sus vínculos y capacidades.",
    bg: "#0271bd",
    light: "#e8f4fd",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-white" />,
    titulo: "Talleres Educativos",
    descripcion: "Espacios de aprendizaje para niños, jóvenes y adultos con actividades que desarrollan habilidades para la vida.",
    bg: "#6923b7",
    light: "#f0e8fb",
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    titulo: "Actividades Comunitarias",
    descripcion: "Eventos y dinámicas que unen a la comunidad de Chiriaco, promoviendo la solidaridad y el trabajo en equipo.",
    bg: "#0271bd",
    light: "#e8f4fd",
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    titulo: "Voluntariado Joven",
    descripcion: "Jóvenes comprometidos que dedican su tiempo a construir un mundo mejor y más humano desde su comunidad.",
    bg: "#6923b7",
    light: "#f0e8fb",
  },
];

const stats = [
  { valor: "+50", label: "Familias acompañadas", color: "#0271bd" },
  { valor: "+20", label: "Voluntarios activos", color: "#6923b7" },
  { valor: "+10", label: "Talleres realizados", color: "#0271bd" },
  { valor: "2", label: "Años de impacto", color: "#6923b7" },
];

const fotos = [
  { src: "/images/hero-images/foto1.jpg", alt: "Actividad 1" },
  { src: "/images/hero-images/foto2.jpg", alt: "Talleres" },
  { src: "/images/hero-images/foto3.jpg", alt: "Family Love" },
  { src: "/images/hero-images/foto4.jpg", alt: "Voluntarios" },
  { src: "/images/hero-images/foto5.jpg", alt: "Comunidad" },
  { src: "/images/hero-images/foto6.jpg", alt: "Actividad 6" },
];

const Page = async ({ params }: { params: { sede: string } }) => {
  const data = await getData(params.sede);

  return (
    <main className="pb-20 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-16 px-6 md:px-12" style={{ background: "linear-gradient(135deg, #0271bd 0%, #6923b7 100%)" }}>
        <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "#73eafe" }} />
        <div className="absolute bottom-[-40px] left-[-40px] w-44 h-44 rounded-full opacity-10 pointer-events-none" style={{ background: "#73eafe" }} />
        <div className="relative max-w-5xl mx-auto flex flex-col gap-4">
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full self-start" style={{ background: "#73eafe", color: "#0271bd" }}>
            Sede · Departamento Amazonas
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">{data.name}</h1>
          <p className="text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">{data.description}</p>
          <p className="flex items-center gap-2 text-white/70 text-sm mt-1">
            <MapPin strokeWidth={1.5} className="w-4 h-4 shrink-0" />
            <span>{data.address}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/voluntariado" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: "#73eafe", color: "#0271bd" }}>
              <Heart className="w-4 h-4" />
              Quiero ser voluntario
            </Link>
            <Link href="/contacto" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border-2 border-white/50 text-white transition-all duration-300 hover:scale-105 hover:border-white">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 px-6 md:px-12" style={{ background: "#f0f8ff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 text-center shadow-sm flex flex-col gap-1 hover:-translate-y-1 transition-all duration-300 bg-white" style={{ borderTop: `4px solid ${s.color}` }}>
              <span className="text-4xl font-extrabold" style={{ color: s.color }}>{s.valor}</span>
              <span className="text-sm text-zinc-500">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESCRIPCIÓN ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-bold tracking-widest uppercase self-start px-3 py-1 rounded-full" style={{ background: "#e8f4fd", color: "#0271bd" }}>
              Nuestra historia
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white leading-snug">
              Amor, Familia y <span style={{ color: "#6923b7" }}>Esperanza</span> en el Amazonas
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Nuestra sede en Chiriaco nació del deseo de llevar esperanza a familias que más lo necesitan. Trabajamos día a día junto a la comunidad, acompañando a niños, jóvenes y adultos en su desarrollo integral.
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Somos jóvenes unidos por un propósito: construir un mundo más humano y solidario. Cada taller, cada visita, cada sonrisa es parte de nuestra misión de transformar vidas desde el amor.
            </p>
          </div>
          <div className="rounded-3xl p-8 flex flex-col gap-4 shadow-xl" style={{ background: "linear-gradient(135deg, #0271bd 0%, #6923b7 100%)" }}>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.15)" }}>
              <p className="text-white font-bold text-lg mb-1">Nuestra Misión</p>
              <p className="text-white/80 text-sm leading-relaxed">Somos una Organizacion sin fines de lucro que busca el desarrollo integral de los jóvenes y sus familias mediante el acompañamiento, la educación y el servicio comunitario.</p>
            </div>
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.10)" }}>
              <p className="text-white font-bold text-lg mb-1">Nuestra Visión</p>
              <p className="text-white/80 text-sm leading-relaxed">Ser una organización reconocida a nivel nacional por su impacto positivo en el desarrollo integral de familias y comunidades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMAS ── */}
      <section className="py-16 px-6 md:px-12" style={{ background: "#f5f0fc" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: "#e8d5f9", color: "#6923b7" }}>
              Lo que hacemos
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white mt-3">Nuestros Programas</h2>
            <p className="text-zinc-500 mt-2 max-w-xl mx-auto text-sm">Actividades que transforman vidas y fortalecen el tejido social de la comunidad amazónica.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programas.map((p, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="p-6 flex items-center justify-center" style={{ background: p.bg }}>
                  <div className="rounded-full p-4" style={{ background: "rgba(255,255,255,0.2)" }}>{p.icon}</div>
                </div>
                <div className="p-5 flex flex-col gap-2" style={{ background: p.light }}>
                  <h3 className="font-bold text-sm" style={{ color: p.bg }}>{p.titulo}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: "#e8f4fd", color: "#0271bd" }}>
              Galería
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white mt-3">Momentos que inspiran</h2>
            <p className="text-zinc-500 mt-2 max-w-xl mx-auto text-sm">Cada imagen cuenta una historia de amor, esfuerzo y comunidad.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fotos.map((foto, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ border: `3px solid ${i % 2 === 0 ? "#73eafe" : "#6923b7"}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={foto.src} alt={foto.alt} className="w-full h-full object-cover" style={{ minHeight: i === 0 ? "300px" : "170px" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAPA + FORMULARIO ── */}
      <section className="py-16 px-6 md:px-12" style={{ background: "#f0f8ff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: "#e8f4fd", color: "#0271bd" }}>
              Ubicación
            </span>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-3">Encuéntranos</h2>
            <p className="flex items-center justify-center gap-2 text-zinc-500 text-sm mt-2">
              <MapPin strokeWidth={1.5} className="w-4 h-4" />
              {data.address}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* MAPA */}
            <div className="flex-1 w-full rounded-3xl overflow-hidden shadow-xl" style={{ border: "4px solid #73eafe" }}>
              <iframe
                src={`${data.mapUrl}`}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[450px]"
              />
            </div>

            {/* FORMULARIO */}
            <div className="flex-1 w-full">
              <ContactEmailForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="mt-8 mx-6 md:mx-auto rounded-3xl py-14 px-8 text-center max-w-5xl" style={{ background: "linear-gradient(135deg, #6923b7 0%, #0271bd 100%)" }}>
        <div className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ background: "#73eafe", color: "#0271bd" }}>
          Únete al cambio
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">¿Quieres ser parte de Family Love?</h2>
        <p className="text-white/80 max-w-md mx-auto mb-7 text-sm">
          Tu tiempo y compromiso pueden transformar vidas. Forma parte de nuestra familia y juntos hagamos un mundo mejor.
        </p>
        <Link href="/voluntariado" className="inline-flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-xl" style={{ background: "#73eafe", color: "#0271bd" }}>
          <Heart className="w-4 h-4" />
          Inscríbete ahora →
        </Link>
      </section>

    </main>
  );
};

export default Page;