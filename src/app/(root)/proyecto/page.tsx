"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const proyectosPorAno: Record<string, Proyecto[]> = {
  "2025": [
    {
      id: 101,
      titulo: "Repartiendo Sonrisas y Sueños – CAR Virgen de Lourdes",
      fecha: "01 marzo 2025",
      resumen:
        "Los voluntarios de Family Love llevaron a cabo una jornada solidaria en el CAR Virgen de Lourdes en Jauja, brindando bienestar emocional y recreación a los niños del albergue.",
      descripcion: `En el marco de sus acciones de responsabilidad social, los voluntarios de Family Love llevaron a cabo una jornada solidaria en el CAR Virgen de Lourdes, con el objetivo de brindar bienestar emocional y espacios de recreación a los niños del albergue.

La actividad, denominada "Repartiendo sonrisas y sueños", incluyó dinámicas de clown comunitario y la entrega de obsequios preparados con especial dedicación. Estas acciones permitieron generar un ambiente de alegría, confianza y cercanía, promoviendo valores como la solidaridad, el respeto y la empatía.

A través de esta intervención, Family Love reafirma su compromiso institucional con el desarrollo integral de la niñez y la promoción de iniciativas que contribuyan positivamente al bienestar de las poblaciones en situación de vulnerabilidad.`,
      imagen: "/images/hero-images/h2.webp",
      fotos: ["/images/hero-images/h2.webp"],
      video: "",
      etiqueta: "Jornada Solidaria",
      color: "from-orange-400 to-rose-500",
      emoji: "🤡",
    },
    {
      id: 102,
      titulo: "Celebrando la Fuerza Femenina: Voces que Inspiran",
      fecha: "08 marzo 2025",
      resumen:
        "Family Love participó en la campaña por el Día Internacional de la Mujer en Matahuasi, con intervenciones artísticas del equipo Elo Clown llevando alegría y reconocimiento.",
      descripcion: `En el marco de las actividades conmemorativas por el Día Internacional de la Mujer, Family Love participó en la campaña "Celebrando la Fuerza Femenina: Voces que Inspiran", organizada por la organización sin fines de lucro Alza tu Voz, en coordinación con la Municipalidad de Matahuasi.

Durante la jornada, el equipo de Elo Clown de Family Love se sumó a las actividades con intervenciones artísticas orientadas a llevar mensajes de alegría, reconocimiento y emoción, resaltando el valor, la fortaleza y el rol fundamental de las mujeres en la sociedad.

La participación en esta campaña reafirma el compromiso institucional de Family Love con la promoción de valores de igualdad, respeto y empoderamiento, así como con el trabajo articulado junto a organizaciones y autoridades locales para generar impacto positivo en la comunidad.`,
      imagen: "/images/hero-images/voces q inspiran.jpg",
      fotos: ["/images/hero-images/voces q inspiran.jpg"],
      video: "",
      etiqueta: "Día de la Mujer",
      color: "from-pink-400 to-purple-500",
      emoji: "💜",
    },
    {
      id: 103,
      titulo: "Taller \"Museo de Recuerdos\" – CAM Concepción",
      fecha: "23 mayo 2025",
      resumen:
        "Family Love llevó a cabo el taller psicosocial Museo de Recuerdos en el CAM Concepción, promoviendo la integración y el bienestar emocional de las personas mayores.",
      descripcion: `Family Love llevó a cabo el taller psicosocial "Museo de Recuerdos" en el CAM Concepción, con el propósito de promover la integración, la memoria activa y el bienestar emocional de las personas mayores.

Durante la jornada, los participantes compartieron historias de vida, experiencias significativas y recuerdos que forman parte de su identidad personal y colectiva. A través de dinámicas psicosociales, se generó un espacio de escucha, respeto y conexión intergeneracional, reafirmando el valor de cada recuerdo como una huella de amor y aprendizaje.

Esta actividad permitió fortalecer vínculos, rescatar la memoria viva y reconocer la importancia de brindar espacios donde las personas mayores se sientan valoradas, escuchadas y acompañadas.`,
      imagen: "/images/hero-images/2 foto family-9.webp",
      fotos: [
               "/images/hero-images/2 foto family-9.webp",
               "/images/hero-images/cam.jpg",
               "/images/hero-images/cam1.jpg",
               "/images/hero-images/cam2.jpg",
               "/images/hero-images/cam3.jpg"
              ],
      video: "",
      etiqueta: "Bienestar Social",
      color: "from-purple-500 to-pink-600",
      emoji: "🏛️",
    },
    {
      id: 104,
      titulo: "Taller de Risoterapia \"Aprendamos a Reír Juntos\" – Zapallanga",
      fecha: "29 mayo 2025",
      resumen:
        "Family Love realizó el taller de risoterapia en el Centro de Salud de Zapallanga, dirigido a pacientes con diabetes e hipertensión, usando la risa como herramienta terapéutica.",
      descripcion: `En el marco de sus acciones de promoción de la salud integral, Family Love realizó el taller de risoterapia "Aprendamos a reír juntos" en el Centro de Salud de Zapallanga, dirigido a pacientes con diagnóstico de diabetes e hipertensión.

La actividad tuvo como objetivo generar un espacio de bienestar emocional, conexión y participación activa, utilizando la risa como una herramienta terapéutica complementaria. A través de dinámicas guiadas, los participantes lograron experimentar momentos de alivio emocional, fortaleciendo su estado de ánimo y promoviendo una visión integral del cuidado de la salud.

Este taller permitió reforzar la importancia del enfoque psicosocial en la atención de la salud, reconociendo que el bienestar emocional es un componente fundamental para mejorar la calidad de vida de las personas.`,
      imagen: "/images/hero-images/taller.webp",
      fotos: ["/images/hero-images/taller.webp"],
      video: "",
      etiqueta: "Salud y Bienestar",
      color: "from-emerald-500 to-teal-600",
      emoji: "😄",
    },
    {
      id: 105,
      titulo: "Primer Aniversario de Family Love",
      fecha: "10 julio 2025",
      resumen:
        "Family Love conmemora su primer aniversario celebrando doce meses de trabajo continuo, crecimiento y compromiso con la transformación social.",
      descripcion: `Family Love conmemora su primer aniversario, celebrando doce meses de trabajo continuo desde el nacimiento de un sueño que hoy se consolida como una organización unida por la empatía, el compromiso y la vocación de servicio.

A lo largo de este primer año, Family Love ha crecido gracias al esfuerzo y dedicación de sus voluntarios, equipos internos y jóvenes líderes, quienes han aportado no solo su tiempo, sino también su corazón en cada iniciativa desarrollada.

Family Love es más que una organización: es un espacio de encuentro, apoyo y trabajo colectivo que promueve valores humanos y fortalece vínculos. Este aniversario marca un hito importante y, a la vez, el inicio de nuevos retos y oportunidades para seguir generando impacto positivo en la sociedad.`,
      imagen: "/images/hero-images/family love ullusca footo-67.webp",
      fotos: [
              "/images/hero-images/family love ullusca footo-67.webp",
              "/images/hero-images/aniversario.jpg",
              "/images/hero-images/aniversario1.jpg",
              "/images/hero-images/aniversario2.jpg",
              "/images/hero-images/aniversario3.jpg"
            ],
      video: "",
      etiqueta: "Aniversario",
      color: "from-yellow-400 to-orange-500",
      emoji: "🎉",
    },
    {
      id: 106,
      titulo: "Campaña \"Corazones Solidarios\" – Albergue Santo Monte de Jehová",
      fecha: "15 agosto 2025",
      resumen:
        "Family Love desarrolló la campaña Corazones Solidarios en el Albergue Santo Monte de Jehová en San Agustín de Cajas, brindando apoyo integral a adultos mayores.",
      descripcion: `En el marco de sus acciones solidarias, Family Love desarrolló la campaña "Corazones Solidarios", una iniciativa orientada a brindar apoyo integral a los adultos mayores del Albergue Santo Monte de Jehová, ubicado en el distrito de San Agustín de Cajas.

Gracias a la participación de la comunidad y al apoyo obtenido a través de la rifa solidaria, fue posible realizar la entrega de donaciones y compartir una jornada de acompañamiento, cuidado y cercanía con los residentes del albergue.

Durante la visita, los voluntarios de Family Love no solo realizaron la entrega de ayuda material, sino que también colaboraron activamente en labores de limpieza, cocina, higiene personal, peinado y cortes de cabello. Asimismo, se preparó y entregó un refrigerio, promoviendo un ambiente de respeto, alegría y trato digno.

Auspiciadores: Joel Oroncoy, Miluscka Makeup, Mr Juerga, Fernix Moda y Rock Centro.`,
      imagen: "/images/hero-images/2 foto family-9.webp",
      fotos: ["/images/hero-images/2 foto family-9.webp"],
      video: "",
      etiqueta: "Campaña Solidaria",
      color: "from-red-400 to-rose-600",
      emoji: "❤️",
    },
    {
      id: 107,
      titulo: "\"Manos que Acompañan\" – Segunda Campaña Solidaria en Jauja",
      fecha: "04 setiembre 2025",
      resumen:
        "Family Love llevó a cabo su segunda campaña solidaria en Jauja, brindando apoyo integral a personas adultas mayores, adultos y niños en situación de vulnerabilidad.",
      descripcion: `Family Love llevó a cabo su segunda campaña solidaria denominada "Manos que Acompañan", una jornada orientada a brindar apoyo integral a personas adultas mayores, adultos y niños en situación de calle o vulnerabilidad en la ciudad de Jauja.

Esta actividad fue posible gracias al apoyo de la comunidad y a los recursos obtenidos mediante la rifa solidaria organizada por Family Love, lo que permitió ampliar el alcance de la intervención y llegar a más personas que requieren acompañamiento y atención.

Durante la jornada, los voluntarios compartieron no solo donaciones, sino también tiempo, escucha activa y gestos de cercanía, reafirmando que la ayuda social va más allá de la asistencia material y que acompañar también significa brindar dignidad y contención emocional.

Auspiciadores: Joel Oroncoy, Miluscka Makeup, Mr Juerga, Fernix Moda y Rock Centro.`,
      imagen: "/images/hero-images/h2.webp",
      fotos: [
              "/images/hero-images/h2.webp",
              "/images/hero-images/solidaridad-jauja.jpg",
              "/images/hero-images/solidaridad-jauja1.jpg",
              "/images/hero-images/solidaridad-jauja2.jpg",
              "/images/hero-images/solidaridad-jauja3.jpg",
              "/images/hero-images/solidaridad-jauja4.jpg",
              "/images/hero-images/solidaridad-jauja5.jpg"
              ],
      video: "",
      etiqueta: "Campaña Solidaria",
      color: "from-blue-400 to-cyan-500",
      emoji: "🤝",
    },
    {
      id: 108,
      titulo: "Primera Campaña Navideña 2025 – San José de Apata",
      fecha: "27 diciembre 2025",
      resumen:
        "Family Love llevó momentos de alegría y esperanza a la comunidad campesina de San José de Apata en Jauja, en su primera campaña navideña del 2025.",
      descripcion: `Elegir un lugar también significa escuchar realidades diversas. La comunidad campesina de San José de Apata es una zona que históricamente ha enfrentado múltiples necesidades; sin embargo, para Family Love, la distancia no representa un límite cuando existe voluntad de servir y compromiso social.

Esta primera campaña navideña del 2025 tuvo como propósito llevar momentos de alegría, cercanía y esperanza, reafirmando que allí donde exista una necesidad, Family Love estará presente con acciones concretas y solidarias.

Auspiciadores: Colegio San Antonio María Claret, Ancosur Inmobiliaria y la Familia Santo Rojas.`,
      imagen: "/images/hero-images/1er-navidad-2025-4.jpg",
      fotos: [
              "/images/hero-images/1er-navidad-2025.jpg",
              "/images/hero-images/1er-navidad-2025-1.jpg",
              "/images/hero-images/1er-navidad-2025-2.jpg",
              "/images/hero-images/1er-navidad-2025-3.jpg",
              "/images/hero-images/1er-navidad-2025-4.jpg",
              "/images/hero-images/1er-navidad-2025-5.jpg",
            ],
      video: "/images/videos/1er-navidad-2025 video-2.mp4",
      etiqueta: "Campaña Navideña",
      color: "from-rose-500 to-red-600",
      emoji: "🎄",
    },
    {
      id: 109,
      titulo: "Segunda Campaña Navideña 2025 – Calles de Huancayo",
      fecha: "30 diciembre 2025",
      resumen:
        "Family Love llevó a cabo su segunda campaña navideña del año en beneficio de adultos mayores y niños en situación de vulnerabilidad en las calles de Huancayo.",
      descripcion: `Family Love llevó a cabo su segunda campaña navideña del año 2025 en beneficio de adultos mayores y niños en situación de vulnerabilidad en las calles de Huancayo.

La intervención tuvo como propósito visibilizar realidades muchas veces olvidadas, escuchar historias que merecen ser atendidas y brindar momentos de cercanía, alegría y acompañamiento a personas que se encuentran en condiciones de alta vulnerabilidad social.

Para Family Love, estar presente en estos espacios reafirma su compromiso de llegar donde más se necesita, generando impacto a través de acciones solidarias y humanas.

Auspiciadores: Colegio San Antonio María Claret, Ancosur Inmobiliaria y la Familia Santo Rojas.`,
      imagen: "/images/hero-images/2-navidad-2025-2.jpg",
      fotos: [
              "/images/hero-images/2-navidad-2025-2.jpg",
              "/images/hero-images/2-navidad-2025.jpg",
              "/images/hero-images/2-navidad-2025-3.jpg",
              "/images/hero-images/2-navidad-2025-4.jpg",
              "/images/hero-images/2-navidad-2025-5.jpg",
              "/images/hero-images/2-navidad-2025-6.jpg",
              "/images/hero-images/2-navidad-2025-7.jpg"
            ],
      video: "/images/videos/1er-navidad-2025 video-1.mp4",
      etiqueta: "Campaña Navideña",
      color: "from-indigo-500 to-blue-600",
      emoji: "🎅",
    },
  ],
  "2024": [
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
      emoji: "🎄",
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

Queremos hacer un reconocimiento especial a nuestros auspiciadores: I.E.P. San Antonio María Claret, Dr. Alex Sinche y el Diario Primicia, por su invaluable respaldo y confianza en nuestra labor.`,
      imagen: "/images/hero-images/family love ullusca footo-67.webp",
      fotos: [
        "/images/hero-images/ullusca navidad-2024-1.jpg",
        "/images/hero-images/ullusca navidad-2024-2.jpg",
        "/images/hero-images/ullusca navidad-2024-3.jpg",
        "/images/hero-images/ullusca navidad-2024-4.jpg",
      ],
      video: "/images/videos/video-ullusca navidad-2024-1.mp4",
      etiqueta: "Campaña Navideña",
      color: "from-blue-500 to-indigo-600",
      emoji: "⭐",
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
      emoji: "💜",
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
      imagen: "/images/hero-images/ONP-1.jpg",
      fotos: [
               "/images/hero-images/ONP-1.jpg",
               "/images/hero-images/ONP-2.jpg",
               "/images/hero-images/ONP-3.jpg",
               "/images/hero-images/ONP-4.jpg",
               "/images/hero-images/ONP-5.jpg"
              ],
      video: "",
      etiqueta: "Salud y Bienestar",
      color: "from-emerald-500 to-teal-600",
      emoji: "😄",
    },
  ],
};

type Proyecto = {
  id: number;
  titulo: string;
  fecha: string;
  resumen: string;
  descripcion: string;
  imagen: string;
  fotos: string[];
  video: string;
  etiqueta: string;
  color: string;
  emoji: string;
};

const anos = ["2025", "2024"];

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
  const [anoActivo, setAnoActivo] = useState("2025");

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