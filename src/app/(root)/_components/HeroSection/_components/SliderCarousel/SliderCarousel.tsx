"use client";

import React, { MouseEvent, useState } from "react";
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
  const [slides, setSlides] = useState(() => {
    const data = transformDataToSlideData(dataSlides);

    return data;
  });
  const [currentSlide, setCurrentSlide] = useState(slides["slide1"]);
  const [disabledButtons, setDisabledButtons] = useState(false);

  const changeSlide = async (slideId: SlideId) => {
    if (currentSlide.index !== slides[slideId].index) {
      setDisabledButtons(true);
      const numberSlide = slides[slideId].index;
      slides[slideId].width = `w-full transition-[width] duration-1200 ${
        numberSlide < currentSlide.index ? "left-0" : "right-0"
      }`;
      let currentSlideId: SlideId;
      for (let slide in slides) {
        const s = slide as SlideId;
        if (slides[s].index === currentSlide.index) {
          currentSlideId = s;
          slides[s].width = `w-0 transition-[width] duration-1400 ${
            numberSlide < currentSlide.index ? "right-0" : "left-0"
          }`;
          slides[s].isMounted = false;
          const newZIndex = slides[slideId].zIndex;
          slides[slideId].zIndex = slides[s].zIndex;
          slides[s].zIndex = newZIndex;
        }
      }

      await (async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            slides[currentSlideId].buttonBgColor = "bg-zinc-400";
            slides[slideId].buttonBgColor = "bg-white";
            slides[slideId].isMounted = true;
            setSlides(slides);
            setDisabledButtons(false);
            resolve("");
          }, 900);
        });
      })();
      setCurrentSlide(slides[slideId]);
    }
  };

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

      <div
        className={`absolute flex flex-col items-center gap-8 cursor-pointer bottom-20 right-1/2 translate-x-1/2 z-[50]`}
      >
        <div className={`flex gap-4`}>
          {Object.entries(slides).map((slide, i) => (
            <button
              disabled={disabledButtons}
              key={i}
              id={slide[0]}
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                console.log(e.currentTarget.id);
                changeSlide(e.currentTarget.id as SlideId);
              }}
              className="h-10 w-10 flex items-center justify-center hover-child-white text-white cursor-pointer"
            >
              <div
                className={`h-[2px] w-full ${slide[1].buttonBgColor} transition-all duration-200`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SliderCarousel;
