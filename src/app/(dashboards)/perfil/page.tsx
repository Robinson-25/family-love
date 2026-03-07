import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Image
          className="w-48"
          src={`/images/logo_hospedaje.png`}
          width={500}
          height={600}
          alt="Logo Hospedajea"
        />
        <p>Hospedaje &ldquo;El Rinconcito&ldquo;</p>
      </section>
    </main>
  );
};

export default Page;
