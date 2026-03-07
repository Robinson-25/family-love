import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <main className="w-full">
      <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
        <Image
          className="w-48"
          src={`/images/hero-images/logo-family-love.png`}
          width={500}
          height={600}
          alt="Logo Family Love"
        />
        <p>Family Love</p>
      </section>
    </main>
  );
};

export default Page;