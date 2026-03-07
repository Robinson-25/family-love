"use client";

import { useState } from "react";

// ─── DATOS ────────────────────────────────────────────────────────────────────
const razones = [
  {
    icono: "💛",
    titulo: "Transforma vidas",
    descripcion:
      "Cada acción que realices tendrá un impacto real en personas que más lo necesitan. Tu tiempo vale más de lo que imaginas.",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icono: "🌱",
    titulo: "Crece personalmente",
    descripcion:
      "Desarrolla habilidades blandas, liderazgo y empatía mientras trabajas junto a jóvenes apasionados por el servicio.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icono: "🤝",
    titulo: "Construye comunidad",
    descripcion:
      "Forma parte de una red de jóvenes comprometidos con el bienestar social, la salud y el desarrollo humano.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icono: "📜",
    titulo: "Certificación oficial",
    descripcion:
      "Recibe un certificado de voluntariado que acredita tu participación y enriquece tu perfil profesional.",
    color: "from-purple-400 to-pink-500",
  },
];

const requisitos = [
  { numero: "01", texto: "Tener entre 16 y 35 años de edad." },
  { numero: "02", texto: "Compromiso mínimo de 3 horas semanales." },
  { numero: "03", texto: "Actitud positiva, responsabilidad y trabajo en equipo." },
  { numero: "04", texto: "Disponibilidad para participar en actividades presenciales, o virtual." },
  { numero: "05", texto: "No se requiere experiencia previa — solo muchas ganas de ayudar." },
];

const testimonios = [
  {
    nombre: "Robinson W. Biktu",
    cargo: "Voluntario desde 2025",
    texto:
      "Unirme a Family Love fue una de las mejores decisiones de mi vida. Aprendí a valorar lo que tengo y a dar sin esperar nada a cambio.",
    inicial: "R",
    color: "bg-rose-500",
  },
  {
    nombre: "Sebastián Torres",
    cargo: "Voluntario desde 2024",
    texto:
      "Las campañas navideñas me enseñaron que la felicidad más grande es ver sonreír a alguien a quien le diste un motivo para hacerlo.",
    inicial: "S",
    color: "bg-blue-500",
  },
  {
    nombre: "Amy Egoavil",
    cargo: "Voluntaria desde 2024",
    texto:
      "Family Love me dio un espacio para crecer, conocer personas increíbles y sentir que mi esfuerzo realmente importa.",
    inicial: "A",
    color: "bg-emerald-500",
  },
];

// ─── FORMULARIO ───────────────────────────────────────────────────────────────
function Formulario() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    email: "",
    telefono: "",
    motivacion: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.edad || !form.email || !form.telefono) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    setError("");
    setCargando(true);

    try {
      const res = await fetch("/api/voluntario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setEnviado(true);
      } else {
        setError("Hubo un error al enviar. Intenta nuevamente.");
      }
    } catch {
      setError("Hubo un error de conexión. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  if (enviado) {
    return (
      <div className="text-center py-16 px-6">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-extrabold text-[#1a3a6b] mb-3">
          ¡Gracias por unirte!
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Recibimos tu solicitud. Pronto nos pondremos en contacto contigo para darte la bienvenida a Family Love.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Edad *
          </label>
          <input
            type="number"
            name="edad"
            value={form.edad}
            onChange={handleChange}
            placeholder="Tu edad"
            min="16"
            max="35"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+51 999 999 999"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          ¿Por qué quieres ser voluntario?
        </label>
        <textarea
          name="motivacion"
          value={form.motivacion}
          onChange={handleChange}
          placeholder="Cuéntanos un poco sobre ti y tu motivación..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2251a3] transition resize-none"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={cargando}
        className="w-full bg-gradient-to-r from-[#1a3a6b] to-[#2251a3] text-white font-bold py-4 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all duration-300 text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {cargando ? "Enviando..." : "Quiero ser voluntario 💛"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        * Campos obligatorios. Nos comunicaremos contigo por WhatsApp o correo.
      </p>
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function VoluntariadoPage() {
  return (
    <main className="bg-white text-gray-800 font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#73eafe] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Únete al cambio
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Sé Voluntario
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tu tiempo y compromiso pueden transformar vidas. Forma parte de Family Love y juntos hagamos un mundo mejor.
          </p>
          <a
            href="#formulario"
            className="inline-block mt-8 bg-white text-[#1a3a6b] font-bold px-8 py-3 rounded-full hover:bg-[#73eafe] transition hover:scale-105"
          >
            Inscríbete ahora →
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── POR QUÉ SER VOLUNTARIO ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Razones para unirte</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">¿Por qué ser voluntario?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {razones.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#1a3a6b] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${r.color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                {r.icono}
              </div>
              <h3 className="inline-block bg-[#1a3a6b] text-white font-bold text-sm px-3 py-1 rounded-lg mb-2">{r.titulo}</h3>
              <p className="text-gray-900 font-semibold text-sm leading-relaxed">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REQUISITOS ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Lo que necesitas</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Requisitos para unirte</h2>
          </div>

          <div className="space-y-4">
            {requisitos.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-5 bg-[#1a3a6b] rounded-2xl p-5 shadow-md border-2 border-[#2251a3] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl font-extrabold text-[#73eafe] font-mono leading-none flex-shrink-0">
                  {r.numero}
                </span>
                <p className="text-white font-semibold text-base leading-relaxed">{r.texto}</p>
                <span className="ml-auto text-[#73eafe] text-2xl font-bold flex-shrink-0">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">Voces del equipo</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Lo que dicen nuestros voluntarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#1a3a6b] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="text-5xl text-[#2251a3] opacity-20 font-serif leading-none mb-3"></div>
                <p className="text-gray-900 text-sm leading-relaxed italic mb-6">
                  {t.texto}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {t.inicial}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.nombre}</p>
                  <p className="text-gray-400 text-xs">{t.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMULARIO ────────────────────────────────────────────────────── */}
      <section id="formulario" className="bg-gradient-to-br from-[#1a3a6b] to-[#2251a3] py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#73eafe] font-semibold text-sm tracking-widest uppercase">¡Es tu momento!</span>
            <h2 className="text-4xl font-extrabold text-white mt-2">Formulario de inscripción</h2>
            <p className="text-white/70 mt-3 text-sm">
              Completa el formulario y nos pondremos en contacto contigo muy pronto.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <Formulario />
          </div>
        </div>
      </section>

    </main>
  );
}