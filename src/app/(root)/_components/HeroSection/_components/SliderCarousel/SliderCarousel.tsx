"use client";

import React, { useState, useEffect, useRef } from "react";
import Slide from "../Slide/slide";

type SlideId = "slide1" | "slide2" | "slide3";

interface SlideType {
  index: number;
  width: string;
  zIndex: string;
  isMounted: boolean;
}

export interface Slides {
  [key: string]: SlideType;
}

const totalSlides = 1;

const initSlides = (): Slides => {
  let slides: Slides = {};
  for (let i = 0; i < totalSlides; i++) {
    slides[`slide${i + 1}`] = {
      index: i + 1,
      width: i === 0 ? "w-full" : "w-0",
      zIndex: `z-${(totalSlides - i) * 10}`,
      isMounted: i === 0,
    };
  }
  return slides;
};

const SliderCarousel = () => {
  const [slides, setSlides] = useState(() => initSlides());
  const [currentSlide, setCurrentSlide] = useState(slides["slide1"]);
  const currentSlideRef = useRef(currentSlide);
  const slidesRef = useRef(slides);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    slidesRef.current = slides;
  }, [slides]);

  return (
    <>
      {Object.entries(slides).map((slide, i) => (
        <div
          key={i}
          className={`${slide[1].zIndex} ${slide[1].width} h-full overflow-hidden absolute`}
        >
          <Slide
            mounted={slide[1].isMounted}
            title=""
            subtitle=""
            bgImage=""
            urlSegment=""
          />
        </div>
      ))}
    </>
  );
};

export default SliderCarousel;