import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Heart, BookOpen, Users, Leaf, Smile } from "lucide-react";

const ramas = [
  {
    titulo: "Salud y Bienestar",
    descripcion: "Llevamos alegría y soporte emocional a hospitales y zonas vulnerables, usando el arte del clown como herramienta de sanación.",
    icono: Heart,
    tag: "Salud emocional",
    top: "bg-rose-500",
    icon: "bg-rose-100 text-rose-600",
  },
  {
    titulo: "Académico",
    descripcion: "Formamos a los próximos líderes sociales mediante talleres de habilidades blandas, ética y gestión de proyectos comunitarios.",
    icono: BookOpen,
    tag: "Formación",
    top: "bg-blue-500",
    icon: "bg-blue-100 text-blue-600",
  },
  {
    titulo: "Acción Comunitaria",
    descripcion: "Impulsamos el voluntariado y la participación ciudadana para transformar comunidades desde adentro con proyectos de impacto social.",
    icono: Users,
    tag: "Comunidad",
    top: "bg-amber-500",
    icon: "bg-amber-100 text-amber-600",
  },
  {
    titulo: "Ambiental",
    descripcion: "Programas de concientización y jornadas de limpieza o reforestación para mitigar el impacto ambiental en nuestra comunidad.",
    icono: Leaf,
    tag: "Ambiente",
    top: "bg-emerald-500",
    icon: "bg-emerald-100 text-emerald-600",
  },
];

export default function ProgramasPage() {
  return (
    <main className="bg-white text-gray-800 font-sans selection:bg-[#73eafe] selection:text-[#1a3a6b]">

      {/* ── HERO ── */}
      <section className="relative pt-14 pb-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a6b 0%, #2251a3 50%, #73eafe 100%)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#73eafe]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#73eafe] text-xs font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-8 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#73eafe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#73eafe]"></span>
            </span>
            Nuestras Iniciativas Programas Sociales
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 drop-shadow-2xl">
            Pro<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73eafe] to-blue-400">gramas</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed font-medium">
            En <span className="text-white font-bold">Family Love</span>, transformamos la intención en acción a través de pilares diseñados para el crecimiento humano y social.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[100px] fill-white">
            <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ── ELO CLOWN + 4 RAMAS ── */}
      <section className="max-w-5xl mx-auto px-6 mt-16 pb-24">

        {/* Tarjeta Elo Clown */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 rounded-none p-4 w-fit mx-auto border-2 border-[#1a3a6b]">
          <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Smile className="w-10 h-10 text-amber-500" />
          </div>
          <div className="text-center md:text-left">
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 px-4 py-1 rounded-full mb-3">
              Programa institucional
            </span>
            <h2 className="text-3xl font-black text-[#1a3a6b]">Elo Clown</h2>
          </div>
        </div>

        {/* Conector */}
        <div className="flex flex-col items-center py-2">
          <div className="w-px h-5 bg-gray-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 rounded-full px-4 py-1 bg-gray-50">
            4 líneas institucionales
          </span>
          <div className="w-px h-5 bg-gray-200" />
        </div>

        {/* Las 4 ramas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ramas.map((r) => {
            const Icono = r.icono;
            return (
              <div
                key={r.titulo}
                className="group relative bg-white rounded-[1.5rem] p-6 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-[#73eafe] hover:shadow-[0_20px_40px_rgba(115,234,254,0.12)] transition-all duration-500 flex flex-col gap-4 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-[1.5rem] ${r.top}`} />
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mt-1 ${r.icon}`}>
                  <Icono className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-1">{r.tag}</span>
                  <h3 className="text-[15px] font-bold text-[#1a3a6b] group-hover:text-blue-600 transition-colors">{r.titulo}</h3>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed flex-1">{r.descripcion}</p>
                <button className="flex items-center gap-2 text-[11px] font-bold text-[#1a3a6b] group-hover:gap-3 transition-all uppercase tracking-tight mt-auto pt-3 border-t border-gray-50">
                  Saber más <ArrowRight className="w-3 h-3 text-[#73eafe]" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── METODOLOGÍA ── */}
      <section className="bg-[#f8fafc] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-4xl font-extrabold text-[#1a3a6b]">Nuestra Metodología de Impacto</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                No solo realizamos actividades; creamos experiencias transformadoras basadas en resultados sostenibles.
              </p>
              <ul className="space-y-4">
                {['Enfoque basado en valores', 'Medición de impacto social', 'Participación activa juvenil'].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-[#2251a3]">
                    <CheckCircle2 className="text-[#73eafe] w-6 h-6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="h-64 rounded-[2rem] bg-[#1a3a6b] overflow-hidden relative shadow-2xl translate-y-8">
                <div className="absolute inset-0 bg-blue-500/20" />
                <Image src="/images/hero-images/empatia.webp" alt="Impacto" fill className="object-cover" />
              </div>
              <div className="h-64 rounded-[2rem] bg-[#73eafe] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-black/10" />
                <Image src="/images/hero-images/formacion.webp" alt="Formación" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] rounded-[3rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#1a3a6b] rounded-[3rem] p-12 md:p-20 text-center text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">¿Listo para dejar tu huella?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 opacity-90">
              Cada programa es una oportunidad para cambiar una vida, incluyendo la tuya. Únete a Family Love hoy.
            </p>
             <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
               {/* Botón: Quiero ser voluntario - Te lleva a la página y baja al formulario */}
               <Link 
                 href="/voluntariado#formulario"
                 className="bg-[#73eafe] text-[#1a3a6b] font-black py-5 px-12 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(115,234,254,0.3)] text-center"
               >
                 QUIERO SER VOLUNTARIO
               </Link>
               {/* Botón: Ver proyectos - Te lleva a la página de proyectos */}
               <Link 
                 href="/proyecto"
                 className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-5 px-12 rounded-full hover:bg-white/20 transition-all text-center"
               >
                 VER PROYECTOS
               </Link>

             </div>
          </div>
        </div>
      </section>

    </main>
  );
}