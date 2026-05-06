"use client";

import SliderCarousel from "./_components/SliderCarousel/SliderCarousel";
import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

const data: HotelCenter[] = [
  {
    id: "1",
    name: "Family Love",
    reference: "",
    address: "",
    mapUrl: "",
    description: "Organización sin fines de papi",
    urlSegment: "",
    phone: null,
    cellPhone: null,
    garage: false,
    rooms: [],
    images: [],
  },
];

const HeroSection = () => {
  return (
    <section className="w-full h-[450px] relative">
      <SliderCarousel dataSlides={data} />
    </section>
  );
};

export default HeroSection;