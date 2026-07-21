"use client";
import Image from "next/image";
import { useState } from "react";

// ─── DATOS ────────────────────────────────────────────────────────────────────
const mision =
  "Somos una organización sin fines de lucro que busca el desarrollo integral en los jóvenes mediante el voluntariado a la población.";

const vision =
  "Ser una organización sin fines de lucro reconocida a nivel nacional por su impacto positivo en el desarrollo integral de la juventud y en la labor social en la población.";

const historia = [
  "Family Love nació el 10 de julio de 2024 con el propósito de contribuir al desarrollo integral de adolescentes y jóvenes mediante el voluntariado, la acción social y el liderazgo con enfoque humano, promoviendo una cultura de empatía, solidaridad y compromiso con las comunidades más vulnerables del Perú.",
  "Como parte de su proceso de fortalecimiento institucional, el 2 de abril de 2025 la organización presentó su logo oficial, consolidando su identidad institucional y proyectando una imagen alineada con su misión, visión y valores.",
  "Durante el año 2024, Family Love desarrolló sus primeras actividades de impacto social, entre ellas el Taller de Risoterapia dirigido a adultos mayores de la ONP y del CAM ESSALUD – Concepción. Asimismo, realizó su primera campaña navideña solidaria en la comunidad campesina de Ullusca, provincia de Jauja, y una campaña de ayuda solidaria en las calles de Huancayo, brindando acompañamiento humano y apoyo mediante la entrega de juguetes, ropa y víveres a personas en situación de vulnerabilidad.",
  "En 2025, la organización amplió su labor social mediante actividades de acompañamiento en el CAR Virgen de Lourdes de Jauja, nuevos talleres de risoterapia en el Centro de Salud de Sapallanga y el CAM ESSALUD – Concepción, campañas solidarias en favor del albergue Santo Monte de Jehová y de adultos mayores en situación de abandono en las calles de Jauja. Asimismo, participó como organización colaboradora en el evento \"Celebrando la Fuerza Femenina\", reafirmando su compromiso con el servicio y el trabajo articulado con otras instituciones.",
  "Como parte de las últimas actividades del año 2025, Family Love realizó su segunda campaña navideña solidaria en la comunidad de San José de Apata, provincia de Jauja, y una campaña de apoyo dirigida a adultos mayores en las calles de Huancayo, reafirmando su compromiso con las poblaciones en situación de vulnerabilidad.",
  "A lo largo de su crecimiento, Family Love ha contado con el respaldo de aliados estratégicos y auspiciadores que han contribuido al desarrollo de sus programas y proyectos sociales, fortaleciendo su impacto en las comunidades beneficiarias.",
  "Actualmente, Family Love continúa consolidándose como una organización juvenil con visión de crecimiento, estructura organizacional y un firme compromiso con el desarrollo social y humano del Perú, bajo el liderazgo de su fundadora y directora general, Tania Sarai Trinidad Meza.",
];

const objetivos = [
  {
    icono: "🎓",
    titulo: "Desarrollo Académico",
    descripcion:
      "Impulsar el desarrollo intelectual de niños,adolescentes y jóvenes a través de ponencias, talleres y charlas, destacando la importancia de la lectura y la investigación.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icono: "🤝",
    titulo: "Salud, Bienestar Integral",
    descripcion:
      "Promovemos la salud física y mental de nuestros voluntarios y de las comunidades mediante diversas  actividades que contribuyen al bienestar integral y al desarrollo personal.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icono: "💚",
    titulo: " Acción Comunitaria",
    descripcion:
      "Fomentar la participación en voluntariados comunitarios y en diversas iniciativas sociales, con el fin de fortalecer el desarrollo de habilidades blandas esenciales para lavida personal y profesional de los jóvenes",
    color: "from-green-500 to-green-600",
  },
  {
    icono: "🌿",
    titulo: "Bienestar Ambiental",
    descripcion:
      "Desarrollar conciencia ambiental y generar un impacto positivo en el medio ambiente",
    color: "from-emerald-500 to-emerald-600",
  },
];

// ─── EQUIPO CON BIOGRAFÍAS REALES (según documento PDF) ──────────────────────
const equipo = [
  {
    nombre: "Tania Trinidad",
    cargo: "DIRECTORA GENERAL - FUNDADORA",
    imagen: "/images/hero-images/tania.png",
    bio: "Estudiante de Medicina Humana. Modelo profesional, 2021–actualidad. Fundadora de la organización Family Love y de 'Alza Tu Voz'. Becaria del Aspire Leaders Program (fundado por Harvard) y del programa Patria C. Parlamentaria Joven - Plenario Región Junín, 2025. Embajadora IRF, 2026. Community Leader Institute Aspire, 2026. Co-directora general de Family Love, 2024, y directora general durante el periodo 2025–2026. Ponente de la conferencia 'Liderar desde lo humano: jóvenes que transforman realidades desde la empatía y la acción' – Bridges of Equity.",
  },
  {
    nombre: "Naiara Raymundo",
    cargo: "CONSEJERA INSTITUCIONAL - FUNDADORA",
    imagen: "/images/hero-images/Naiara.png",
    bio: "Estudiante de Medicina Humana y fundadora de Family Love. Ponente en el tema 'Cirrosis hepática y complicaciones' – SOCIEMLA, 2024. Coordinadora de la Sociedad de Clown Hospitalario y Comunitario 'Thieves of Smiles' – UPLA, 2023. Especialista certificada en lectura veloz – ENSIL. Reconocida como Mejor Cumista Femenina en el CUMIS Nacional 2024-I, Río Tambo – SOCIEMC. Ponente en los talleres 'Niño interior y manejo de grupos infantiles' (SOCIEMC) e 'Introducción al clown hospitalario' (Universidad Nacional de Piura), ambos 2024-I. Ponente del tema 'Anatomía de miembro inferior' – SOCIEMLA, 2021.",
  },
  {
    nombre: "Darlyne Oviedo",
    cargo: "SECRETARÍA GENERAL",
    imagen: "/images/hero-images/Darlyne.jpg",
    bio: "Estudiante de la carrera de Derecho en la Universidad Continental. Participante del Impact Startup Competition UP, 2021. Ponente en el Seminario Internacional Interdisciplinario sobre Desenvolvimiento y Sociedad – UNIARP, 2025. Secretaria General de la organización Family Love, 2024–actualidad. Becaria del programa Beca 18 – Convocatoria 2021.",
  },
  {
    nombre: "María A. Campos",
    cargo: "DIRECTORA DE RELACIONES INTERNACIONALES",
    imagen: "/images/hero-images/Maria.png",
    bio: "Estudiante de Maestría en Relaciones Internacionales en la Universidad Federal de la Integración Latinoamericana (UNILA) – becaria CNPq. Licenciada en Ciencia Política y Sociología por la UNILA. Investigadora del Programa de Educación por el Trabajo (PET), con reconocimiento de honor. Voluntaria en organizaciones de apoyo a población migrante y derechos humanos en Brasil y Colombia. Participante del Kectil Program e integrante del Aspire Leaders Program 2026 (fundado por Harvard). Ganadora del primer lugar en el Concurso de Ensayos de la Jornada Internacional de Diplomacia y Participación Juvenil, 2026. Autora de publicaciones académicas sobre maternidad, salud mental y políticas públicas en el SUS. Dominio de español y portugués, con inglés en formación.",
  },
  {
    nombre: "Jhan Toro",
    cargo: "DIRECTOR ACADÉMICO",
    imagen: "/images/hero-images/Jhan Toro.png",
    bio: "Estudiante de la Facultad de Medicina Humana de la Universidad Nacional del Centro del Perú (UNCP). Participante en campañas médicas en Tarma, brindando apoyo asistencial y sesiones educativas sobre estilos de vida saludable. Subdirector Académico de Family Love, 2025. Tutor de la Academia Intelectus y docente en academias preuniversitarias en cursos como Biología, Anatomía y Razonamiento Matemático, entre otros. Formación en oratoria, liderazgo y cursos especializados de la carrera de Medicina Humana.",
  },
  {
    nombre: "Ibeth Fernandez",
    cargo: "SUB DIRECTORA ACADÉMICA",
    imagen: "/images/hero-images/Ibeth.png",
    bio: "Estudiante de la Facultad de Medicina Humana. Participante en campañas médicas en Comas. Voluntaria en la campaña navideña de San José de Apata – Family Love, 2025, y en la campaña navideña de Ullusca, Jauja – Family Love, 2024. Subdirectora del Comité Académico durante el periodo 2025–2026. Formación en Ofimática en el Centro Educativo Procedat.",
  },
  {
    nombre: "Sheyla Aliaga",
    cargo: "COORDINADORA ACADÉMICA DE DERECHO",
    imagen: "/images/hero-images/Sheyla.png",
    bio: "Bachiller en Derecho y Ciencias Políticas por la Universidad de Huánuco. Becaria del programa Ashanti Perú; representante en el Encuentro Nacional de la Juventud 2024; seleccionada para el Laboratorio Macrocentro de Actúa.pe y el programa Patria C. Voluntaria del Ministerio Público, promotora ambiental de EDUCCA y voluntaria de la Dirección Regional de Trabajo de Huánuco. Directora de Justicia y Derechos Humanos y Subdirectora de Medio Ambiente. Ponente y facilitadora en charlas de Escuela de Padres, talleres de Educación Sexual Integral (ESI) y capacitaciones sobre prevención de la trata de personas. Formación en liderazgo y oratoria.",
  },
  {
    nombre: "Nayruth Paucar",
    cargo: "COORDINADORA ACADÉMICA DE INGENIERÍA Y TECNOLOGÍA",
    imagen: "/images/hero-images/Nayruth.png",
    bio: "Egresada de la carrera de Ingeniería Agrónoma de la Universidad Nacional del Santa (UNS). Exalumna del programa Aspire Leaders. Excoordinadora del programa 'PROYÉCTATE' de la Región de Ancash. Directora de Desarrollo e Inclusión Social de la REDMUN Ancash. Voluntaria en Chimbote de Pie, enfocada en la defensa del medio ambiente y la descontaminación de la bahía El Ferrol. Voluntaria en proyectos sociales de iniciativas educativas y del programa 'VOCACIÓNATE'.",
  },
  {
    nombre: "Cristhel Gonzales",
    cargo: "CO-COORDINADORA ESCOLAR",
    imagen: "/images/hero-images/Cristhel.png",
    bio: "Estudiante de Trabajo Social en la Universidad Nacional del Centro del Perú (UNCP). Participante en el foro 'Mujeres Empoderadas'. Voluntaria en EsSalud y en la Fundación Peruana de Cáncer. Integrante de la Red Internacional de Jóvenes Empoderadas del Perú.",
  },
  {
    nombre: "Brayhan Lazo",
    cargo: "CO-COORDINADOR ESCOLAR",
    imagen: "/images/hero-images/Brayhan.png",
    bio: "Estudiante de Ingeniería Metalúrgica y de Materiales en la Universidad Nacional del Centro del Perú (UNCP). Interés en la aplicación de herramientas digitales y métodos matemáticos avanzados para la resolución de problemas de ingeniería. Emprendedor activo, comprometido con el desarrollo profesional y el aprendizaje continuo.",
  },
  {
    nombre: "Marely Rodriguez",
    cargo: "DIRECTORA DE ACCIÓN COMUNITARIA",
    imagen: "/images/hero-images/Marely.png",
    bio: "Egresada de la carrera de Sociología de la Universidad Nacional del Centro del Perú (UNCP). Participante en foros de gestión pública orientados al desarrollo social y juvenil. Becaria y voluntaria del programa Jóvenes Emprendedores EduCaixa. Exdirectora de Desarrollo e Inclusión Social de la Red MUN Junín. Voluntaria en veeduría y vigilancia de programas sociales del MIDIS. Voluntaria en proyectos sociales enfocados en iniciativas educativas y de desarrollo social.",
  },
  {
    nombre: "Evans Malpartida",
    cargo: "SUB DIRECTOR DE ACCIÓN COMUNITARIA",
    imagen: "/images/hero-images/Evans.png",
    bio: "Estudiante de Ingeniería Civil en la Universidad Peruana Los Andes (UPLA). Participante de Parlamento Joven y de programas de formación política y liderazgo juvenil. Promotor de iniciativas orientadas a la participación ciudadana, el liderazgo juvenil y el cumplimiento de los Objetivos de Desarrollo Sostenible (ODS). Participación activa en voluntariados y actividades de impacto social en la región Junín. Comprometido con generar impacto positivo mediante el trabajo colaborativo y la participación juvenil.",
  },
  {
    nombre: "Abigail Crispin",
    cargo: "COORDINADORA DE VOLUNTARIADO",
    imagen: "/images/hero-images/Abigail.png",
    bio: "Estudiante de Medicina Humana en la Universidad Peruana Los Andes (UPLA). Participante de Clown Hospitalario – UPLA. Voluntaria en la campaña navideña de San José de Apata – Family Love, 2025.",
  },
  {
    nombre: "Mafer Mayta",
    cargo: "DIRECTORA DE SALUD Y BIENESTAR",
    imagen: "/images/hero-images/mafer.png",
    bio: "Estudiante de la Facultad de Medicina Humana. Pasante de la Pasantía Nacional Médica en Oncología 'MAQANA ONCO' – Lucha Oncológica, 2026, en el IREN Centro – Concepción. Coordinadora Nacional de Trivias Académicas del Comité Permanente Académico de la Sociedad Científica Médico Estudiantil Peruana (CPA SOCIMEP), 2025. Directora Nacional del Comité Permanente de Relaciones Interinstitucionales e Intercambios de la Sociedad Científica Médico Estudiantil Peruana (CPRII SOCIMEP), 2024. Voluntaria universitaria en el Centro del Adulto Mayor de EsSalud (CAM EsSalud), Concepción, durante los años 2022 y 2023.",
  },
  {
    nombre: "Xiomara Villena",
    cargo: "SUB DIRECTORA DE SALUD Y BIENESTAR",
    imagen: "/images/hero-images/xiomara.png",
    bio: "Estudiante de la Facultad de Medicina Humana. Organizadora de eventos de pequeña escala. Con vocación de aprendizaje y compromiso con la ayuda a quienes más lo necesitan.",
  },
  {
    nombre: "Esaú Sedano",
    cargo: "DIRECTOR DE COMUNICACIONES Y RR. SS.",
    imagen: "/images/hero-images/esau.png",
    bio: "Administrador de Empresas por la Universidad Nacional del Centro del Perú (UNCP). Estudiante de la carrera de Diseño Gráfico en el Instituto Continental. Director de Comunicaciones, Redes Sociales y fotógrafo de Family Love, 2026. Director de Diseño Gráfico y fotógrafo de Family Love, 2025. Apasionado por la fotografía, la música y el deporte. Comprometido con la ayuda social, manteniendo una actitud positiva y promoviendo alegría en quienes más lo necesitan.",
  },
  {
    nombre: "Robinson W. Biktu",
    cargo: "SUBDIRECTOR DE DISEÑO Y DESARROLLO DIGITAL",
    imagen: "/images/hero-images/robinson.png",
    bio: "Estudiante de la carrera de Diseño y Desarrollo de Software en Tecsup. Subdirector de Diseño y Desarrollo Digital de la organización Family Love, 2026. Becario del programa Patria C, 2025. Egresado de estudios en Teología, con vocación de servicio, liderazgo y compromiso con el desarrollo de la comunidad. Apasionado por la tecnología, el diseño digital y el trabajo en equipo, buscando siempre aportar ideas creativas e innovadoras.",
  },
];

// ─── COMPONENTE FLIP CARD ──────────────────────────────────────────────────────
function FlipCard({ persona }: { persona: (typeof equipo)[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      title="Clic para ver biografía"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRENTE ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex flex-col items-center overflow-hidden"
        >
          {/* Foto mitad de cuerpo — ocupa ~65% de la tarjeta */}
          <div className="w-full flex-1 relative overflow-hidden" style={{ minHeight: 0 }}>
            <Image
              src={persona.imagen}
              alt={persona.nombre}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            />
            {/* overlay sutil abajo */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f2a5a]/80 to-transparent" />
          </div>

          {/* Nombre y cargo */}
          <div className="w-full px-5 py-4 text-center bg-[#0f2a5a]/60 backdrop-blur-sm">
            <h3 className="text-white font-bold text-base leading-tight mb-1">{persona.nombre}</h3>
            <p className="text-[#73eafe] text-xs font-semibold leading-snug">{persona.cargo}</p>
            <p className="text-white/40 text-xs mt-2">👆 Clic para ver bio</p>
          </div>
        </div>

        {/* ── REVERSO (BIOGRAFÍA) ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-gradient-to-br from-[#73eafe]/20 to-[#1a3a6b] border border-[#73eafe]/30 rounded-3xl flex flex-col items-center justify-between p-6 overflow-y-auto"
        >
          {/* Avatar pequeño arriba */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#73eafe]/60 shadow-lg flex-shrink-0 relative">
            <Image
              src={persona.imagen}
              alt={persona.nombre}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </div>

          <div className="text-center flex-1 flex flex-col justify-center mt-3">
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{persona.nombre}</h3>
            <p className="text-[#73eafe] text-xs font-bold tracking-wide mb-4">{persona.cargo}</p>
            <p className="text-white/85 text-sm leading-relaxed">{persona.bio}</p>
          </div>

          <p className="text-white/40 text-xs mt-2">👆 Clic para volver</p>
        </div>
      </div>
    </div>
  );
}

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

      {/* ── HISTORIA (texto simple, sin tarjetas ni línea de tiempo) ────────── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Nuestra historia</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">El camino de Family Love</h2>
          </div>

          <div className="space-y-6">
            {historia.map((parrafo, i) => (
              <p
                key={i}
                className="text-gray-700 text-base leading-relaxed text-justify"
              >
                {parrafo}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJETIVOS ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Lo que hacemos</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">EJES INSTITUCIONALES</h2>
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
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#73eafe] font-semibold text-sm tracking-widest uppercase">
            Las personas detrás
          </span>
          <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">
            Nuestro Equipo Directivo
          </h2>
          <p className="text-white/60 text-sm mb-12">Haz clic en cualquier foto para conocer su historia</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {equipo.map((persona, i) => (
              <FlipCard key={i} persona={persona} />
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