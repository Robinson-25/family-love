"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  subtitle: string;
  bgImage: string;
  mounted: boolean;
  urlSegment: string;
}

const heroImages = [
  "/images/hero-images/family love ullusca footo-67.webp",
  "/images/hero-images/2 foto family-9.webp",
  "/images/hero-images/imagen3.jpg",
  "/images/hero-images/family love ullusca footo-67.webp",
  "/images/hero-images/2 foto family-9.webp",
];

const Slide = ({ subtitle, mounted, urlSegment }: Props) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative flex justify-center overflow-hidden">
      {/* Fondo con transición automática */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url('${heroImages[currentImg]}')`,
          opacity: fade ? 1 : 0,
        }}
      />
      

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-[360px] md:max-w-[650px] flex flex-col gap-6 items-center pt-12 md:pt-16 text-white">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 px-6">

          {/* Badge */}
          <span className="text-xs font-semibold tracking-widest uppercase bg-[#6923b7] text-white px-4 py-1 rounded-full">
            Organización sin fines de lucro
          </span>

          {/* Título principal de la organización */}
          <h1
            className={`${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } transition-all duration-700 text-center drop-shadow-xl`}
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Family{" "}
            <span style={{ color: "#73eafe" }}>Love</span>
          </h1>

          <p
            className={`${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } text-sm md:text-base leading-7 max-w-[560px] text-center transition-all duration-700 delay-100`}
            style={{ color: "#e0f5ff" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Botón */}
        <div
          className={`flex gap-4 justify-center mt-2 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } transition-all duration-700 delay-200`}
        >
          <Link
            href="/proyecto"
            className="h-auto w-auto text-sm font-semibold tracking-wide flex gap-1 hover:gap-3 items-center justify-center py-3 px-7 rounded-full bg-[#0271bd] hover:bg-[#73eafe] hover:text-[#0271bd] border border-[#73eafe] transition-all duration-300 text-white shadow-lg"
          >
            <p>Conoce nuestros programas</p>
            <ChevronRight strokeWidth={1.5} className="w-4 h-4 relative top-[1px]" />
          </Link>
        </div>

        {/* Indicadores de imagen */}
        <div className="flex gap-2 mt-4">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === currentImg ? "2rem" : "0.5rem",
                background: i === currentImg ? "#73eafe" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide;