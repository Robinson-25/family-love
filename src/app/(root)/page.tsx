import React from "react";
import HeroSection from "./_components/HeroSection/hero-section";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main>
      <HeroSection />

      {/* ── SECCIÓN SOBRE NOSOTROS ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#2251a3] font-semibold text-sm tracking-widest uppercase">
              Sobre Family Love
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2 leading-tight">
              Amor, Familia y <br />
              <span className="text-[#0271bd]">Esperanza</span>
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              En Family Love, somos una organización dedicada a fortalecer el
              núcleo familiar y brindar apoyo integral a quienes más lo
              necesitan. Creemos que cada familia merece amor, acompañamiento y
              esperanza.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/quienes-somos"
                className="bg-[#0271bd] text-white font-bold px-6 py-3 rounded-full hover:bg-[#73eafe] hover:text-[#0271bd] transition-all duration-300"
              >
                Conócenos
              </Link>
              <Link
                href="/voluntariado"
                className="border-2 border-[#0271bd] text-[#0271bd] font-bold px-6 py-3 rounded-full hover:bg-[#0271bd] hover:text-white transition-all duration-300"
              >
                Sé voluntario
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl overflow-hidden h-48 md:h-64">
              <Image
                src="/images/hero-images/family love ullusca footo-67.webp"
                alt="Family Love"
                width={400}
                height={400}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-48 md:h-64 mt-6">
              <Image
                src="/images/hero-images/2 foto family-9.webp"
                alt="Family Love"
                width={400}
                height={400}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-48 md:h-64">
              <Image
                src="/images/hero-images/inicio01.jpg"
                alt="Family Love"
                width={400}
                height={400}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-48 md:h-64 mt-6">
              <Image
                src="/images/hero-images/inicio02.jpg"
                alt="Family Love"
                width={400}
                height={400}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      
  
    </main>
  );
};

export default Page;