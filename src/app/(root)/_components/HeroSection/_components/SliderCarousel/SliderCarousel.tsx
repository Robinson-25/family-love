"use client";

import React, { MouseEvent, useState, useEffect, useRef } from "react";
import Slide from "../Slide/slide";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";

type SlideId = "slide1" | "slide2" | "slide3";

interface SlideType {
  index: number;
  width: string;
  zIndex: string;
  buttonBgColor: string;
  isMounted: boolean;
  slideTitle: string;
  slideSubtitle: string;
  slideBgImage: string;
  urlSegment: string;
}

export interface Slides {
  [key: string]: SlideType;
}

interface Props {
  dataSlides: HotelCenter[];
}

const transformDataToSlideData = (data: HotelCenter[]) => {
  let slides: Slides = {};
  for (let i = 0; i < data.length; i++) {
    slides[`slide${i + 1}`] = {
      index: i + 1,
      width: i === 0 ? "w-full" : "w-0",
      zIndex: `z-${(data.length - i) * 10}`,
      buttonBgColor: i === 0 ? "bg-white" : "bg-zinc-400",
      isMounted: i === 0 ? true : false,
      slideTitle: data[i].name,
      slideSubtitle: data[i].description,
      slideBgImage: `bg-[url('/images/hero-images/imagen3.jpg')]`,
      urlSegment: data[i].urlSegment,
    };
  }
  return slides;
};

const SliderCarousel = ({ dataSlides }: Props) => {
  const [slides, setSlides] = useState(() => transformDataToSlideData(dataSlides));
  const [currentSlide, setCurrentSlide] = useState(slides["slide1"]);
  const currentSlideRef = useRef(currentSlide);
  const slidesRef = useRef(slides);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    slidesRef.current = slides;
  }, [slides]);

  const changeSlide = (slideId: SlideId) => {
    const currentSlides = { ...slidesRef.current };
    const current = currentSlideRef.current;

    if (current.index === currentSlides[slideId].index) return;

    for (let slide in currentSlides) {
      const s = slide as SlideId;
      if (currentSlides[s].index === current.index) {
        currentSlides[s].width = "w-0";
        currentSlides[s].isMounted = false;
        currentSlides[s].buttonBgColor = "bg-zinc-400";
      }
    }

    currentSlides[slideId].width = "w-full";
    currentSlides[slideId].isMounted = true;
    currentSlides[slideId].buttonBgColor = "bg-white";

    setSlides(currentSlides);
    setCurrentSlide(currentSlides[slideId]);
  };

  useEffect(() => {
    const slideKeys = Object.keys(slidesRef.current);
    if (slideKeys.length <= 1) return;

    const interval = setInterval(() => {
      const current = currentSlideRef.current;
      const total = slideKeys.length;
      const nextIndex = (current.index % total) + 1;
      const nextSlideId = `slide${nextIndex}` as SlideId;
      changeSlide(nextSlideId);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {Object.entries(slides).map((slide, i) => (
        <div
          key={i}
          className={`${slide[1].zIndex} ${slide[1].width} h-full overflow-hidden absolute`}
        >
          <Slide
            mounted={slide[1].isMounted}
            title={slide[1].slideTitle}
            subtitle={slide[1].slideSubtitle}
            bgImage={slide[1].slideBgImage}
            urlSegment={slide[1].urlSegment}
          />
        </div>
      ))}

      <div className="absolute flex flex-col items-center gap-8 cursor-pointer bottom-20 right-1/2 translate-x-1/2 z-[50]">
        <div className="flex gap-4">
          {Object.entries(slides).map((slide, i) => (
            <button
              key={i}
              id={slide[0]}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                changeSlide(e.currentTarget.id as SlideId);
              }}
              className="h-10 w-10 flex items-center justify-center hover-child-white text-white cursor-pointer"
            >
              <div className={`h-[2px] w-full ${slide[1].buttonBgColor}`} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SliderCarousel;