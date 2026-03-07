import Image from "next/image";
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="pb-48 xl:flex lg:gap-32">
      <div className="relative xl:top-20 px-6 lg:px-20 xl:max-w-[600px] flex flex-col xl:items-center xl:justify-center">
        <p className="uppercase tracking-widest text-xs text-center xl:self-start xl:text-start">
          Sobre Family Love
        </p>
        <h2 className="text-3xl mt-4 font-bold text-center xl:self-start xl:text-start xl:text-4xl">
          Amor, Familia y Esperanza

        </h2>
        <p className="mt-4 text-sm leading-7">
          En Family &quot;Love&quot;, somos una organización dedicada a fortalecer el núcleo
          familiar y brindar apoyo integral a quienes más lo necesitan. Creemos
          que cada familia merece amor, acompañamiento y oportunidades para
           crecer. A través de nuestros programas y actividades, trabajamos día a
           día para transformar vidas con compromiso, esperanza y mucho amor. Descubre quiénes somos y lo que hacemos
          en Family &quot;Love&quot;. sé parte de cambio
        </p>
        <div className="mt-6 flex gap-4">
          <div className="flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-[#0271bd]/10 border border-[#0271bd]/20">
            <span className="text-2xl font-bold text-[#0271bd]">+300</span>
            <span className="text-xs text-gray-500 mt-1">Familias apoyadas</span>
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-[#6923b7]/10 border border-[#6923b7]/20">
            <span className="text-2xl font-bold text-[#6923b7]">+20</span>
            <span className="text-xs text-gray-500 mt-1">Programas activos</span>
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-[#73eafe]/20 border border-[#73eafe]/40">
            <span className="text-2xl font-bold text-[#0271bd]">+4</span>
            <span className="text-xs text-gray-500 mt-1">Años de servicio</span>
          </div>
        </div>
      </div>
      <div className="mt-24 flex flex-col items-center justify-center">
        <div className="h-auto w-auto relative flex">
          <Image
            className="relative left-[-44px] sm:left-[-80px] md:left-[-80px] w-48 sm:w-80 md:w-96"
            src="/images/hero-images/imagen1.jpg"
            width={800}
            height={800}
            alt="foto"
          />
          <Image
            className="absolute left-24 top-4 sm:left-36 md:left-48 z-10 w-36 sm:w-64 md:w-80"
            src="/images/hero-images/imagen2.jpg"
            width={800}
            height={800}
            alt="foto"
          />
          <Image
            className="absolute left-12 top-28 sm:left-24 md:left-28 sm:top-40 md:top-48 w-32 sm:w-56 md:w-72"
            src="/images/hero-images/imagen3.jpg"
            width={800}
            height={800}
            alt="foto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
