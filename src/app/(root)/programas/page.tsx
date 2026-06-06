import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

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

      {/* ── ELO CLOWN ── */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] p-10 md:p-14 shadow-2xl">

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#73eafe]/10 rounded-full" />
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">

            {/* Título */}
            <div className="flex-shrink-0">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight">
                Elo
              </h2>
              <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#73eafe] to-blue-300">
                Clown
              </h2>
            </div>

            {/* Divisor */}
            <div className="hidden md:block w-px self-stretch bg-white/10 flex-shrink-0" />

            {/* Descripción */}
            <div className="flex flex-col gap-6 flex-1">
              <p className="text-blue-100/85 text-lg leading-relaxed">
                Desarrollamos intervenciones de <span className="text-white font-semibold">clown hospitalario y comunitario</span> que promueven la alegría, la empatía y el bienestar emocional en las personas, contribuyendo a humanizar distintos espacios sociales y fortaleciendo el compromiso solidario de los voluntarios.
              </p>
              <div className="w-full h-px bg-white/10" />
            </div>
          </div>
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
                <Image src="/images/hero-images/programa02.jpg" alt="Impacto" fill className="object-cover" />
              </div>
              <div className="h-64 rounded-[2rem] bg-[#73eafe] overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-black/10" />
                <Image src="/images/hero-images/programa01.jpg" alt="Formación" fill className="object-cover" />
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
              <Link
                href="/voluntariado#formulario"
                className="bg-[#73eafe] text-[#1a3a6b] font-black py-5 px-12 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(115,234,254,0.3)] text-center"
              >
                QUIERO SER VOLUNTARIO
              </Link>
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