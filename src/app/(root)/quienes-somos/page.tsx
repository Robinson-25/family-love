import Image from "next/image";

// ─── DATOS ────────────────────────────────────────────────────────────────────
const mision =
  "Somos una asociación sin fines de lucro que busca el desarrollo integral en los jóvenes mediante el voluntariado a la población.";

const vision =
  "Ser una asociación sin fines de lucro reconocida a nivel nacional por su impacto positivo en el desarrollo integral de la juventud y en la labor social en la población.";

const historia = [
  {
    fecha: "10 julio 2024",
    texto:
      "Nace Family Love por iniciativa de dos estudiantes de Medicina Humana, Tania Trinidad Meza y Naiara Raymundo Maraví, con el propósito de contribuir al desarrollo integral de los jóvenes a través del voluntariado.",
  },
  {
    fecha: "12 julio 2024",
    texto:
      "Se crea el logo de Family Love gracias al talento de la estudiante de Medicina Humana, Dayana Limache.",
  },
  {
    fecha: "6 octubre 2024",
    texto:
      "Se conforma el equipo de líderes de la asociación, integrado por Maricely Fabián, Piero Bernal, Sebastián Torres, Angie del Río, Amy Egoavil y Solimar Oviedo.",
  },
  {
    fecha: "A lo largo del año",
    texto:
      "Family Love desarrolló el Taller de Risoterapia para adultos mayores de ONP y CAM ESSALUD-Concepción, y dos campañas navideñas en Ullusca, Jauja y Huancayo. Gracias al auspicio de I.E.P. San Antonio María Claret, Dr. Alex Sinche y Diario Primicia.",
  },
];

const objetivos = [
  {
    icono: "🎓",
    titulo: "Desarrollo Académico",
    descripcion:
      "Impulsar el desarrollo intelectual de los jóvenes a través de ponencias, talleres y charlas, destacando la importancia de la lectura y la investigación.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icono: "🤝",
    titulo: "Bienestar Social",
    descripcion:
      "Participar en voluntariados como clown hospitalario, comunitario y otras iniciativas sociales como plataforma para desarrollar habilidades blandas esenciales.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icono: "💚",
    titulo: "Salud Física y Mental",
    descripcion:
      "Fomentar la salud física y mental mediante actividades integrales que fortalezcan la autoestima y el desarrollo personal, incluyendo ejercicio y bienestar emocional.",
    color: "from-green-500 to-green-600",
  },
  {
    icono: "🌿",
    titulo: "Bienestar Ambiental",
    descripcion:
      "Desarrollar conciencia ambiental y generar un impacto positivo en las comunidades a través de acciones sostenibles y responsables con el entorno.",
    color: "from-emerald-500 to-emerald-600",
  },
];

// ── Cuando tengas las fotos, pon las rutas reales en "imagen"
const equipo = [
  {
    nombre: "Tania Trinidad",
    cargo: "Fundadora",
    imagen: "/images/hero-images/tania.webp",
  },
  {
    nombre: "Naiara Raymundo",
    cargo: "Fundadora",
    imagen: "/images/hero-images/Naiara.webp",
  },
  {
    nombre: "Maricely Fabián",
    cargo: "Directora General",
    imagen: "/images/maricely.jpg",
  },
  {
    nombre: "Robinson w. Biktu",
    cargo: "Subdirector",
    imagen: "/images/hero-images/biktu.png",
  },
];

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function QuienesSomosPage() {
  return (
    <main className="bg-white text-gray-800 font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#73eafe] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Organización sin fines de lucro
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            ¿Quiénes Somos?
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Jóvenes unidos por un mundo mejor y más humano.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── MISIÓN Y VISIÓN ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="relative bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] rounded-3xl p-8 text-white overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl mb-5">🎯</div>
              <h2 className="text-2xl font-bold mb-3 tracking-tight">Misión</h2>
              <p className="text-white/85 leading-relaxed text-base">{mision}</p>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#73eafe]/20 to-[#2251a3]/10 border border-[#2251a3]/20 rounded-3xl p-8 overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#73eafe]/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#2251a3]/10 rounded-2xl flex items-center justify-center text-2xl mb-5">🌟</div>
              <h2 className="text-2xl font-bold mb-3 text-[#1a3a6b] tracking-tight">Visión</h2>
              <p className="text-gray-600 leading-relaxed text-base">{vision}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HISTORIA ──────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Nuestra historia</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">El camino de Family Love</h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2251a3] to-[#73eafe] -translate-x-1/2" />
            <div className="space-y-10">
              {historia.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-[#2251a3] rounded-full border-4 border-white shadow -translate-x-1/2 mt-4 z-10" />
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}>
                    <div className="bg-[#2251a3] rounded-2xl p-6 shadow-md border border-[#2251a3] hover:shadow-lg transition-shadow">
                      <span className="inline-block bg-[#73eafe] text-[#1a3a6b] text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {item.fecha}
                      </span>
                      <p className="text-white text-sm leading-relaxed">{item.texto}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJETIVOS ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Lo que hacemos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Objetivos Principales</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {objetivos.map((obj, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#1a3a6b] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${obj.color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                {obj.icono}
              </div>
              <h3 className="inline-block bg-[#1a3a6b] text-white font-bold text-sm px-3 py-1 rounded-lg mb-2">{obj.titulo}</h3>
              <p className="text-gray-900 font-semibold text-sm leading-relaxed">{obj.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EQUIPO DIRECTIVO ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-[#73eafe] font-semibold text-sm tracking-widest uppercase">
            Las personas detrás
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2 mb-12">
            Nuestro Equipo Directivo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipo.map((persona, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition duration-300 flex flex-col items-center"
              >
                {/* Foto cuadrada */}
                <div className="w-28 h-28 mb-5 overflow-hidden border-4 border-white/40 bg-white/20 flex items-center justify-center">
                  <Image
                    src={persona.imagen}
                    alt={persona.nombre}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">{persona.nombre}</h3>
                <p className="text-[#73eafe] text-sm font-semibold">{persona.cargo}</p>
              </div>
            ))}
          </div>

          {/* Frase final */}
          <div className="mt-14 border-t border-white/20 pt-10">
            <p className="text-2xl font-light text-white/90 italic max-w-xl mx-auto leading-relaxed">
                El liderazgo nace del servicio y del compromiso con los demás
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}