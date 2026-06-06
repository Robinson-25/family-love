"use client";

import React, { useEffect, useState } from "react";
import Slide from "./_components/Slide/slide";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="w-full h-[600px] relative">
      <Slide
        mounted={mounted}
        title="Family Love"
        subtitle="Transformando vidas con amor y voluntad"
        bgImage=""
        urlSegment=""
      />
    </section>
  );
};

export default HeroSection;