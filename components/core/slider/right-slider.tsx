"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
import { slides } from "./slides";
import Slide from "./slide";
import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/swiper.css";
import { NextButton, PrevButton } from "./slider-nav";

export default function RightSlider() {
  const swiperModules = useMemo(() => [Pagination, Navigation, Autoplay, A11y], []);

  return (
    <Box h="100vh" position="relative" bg="#A30D1A">
      <Swiper
        modules={swiperModules}
        loop
        navigation
        // ={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          // bulletClass: "swiper-pagination-bullet",
          // bulletActiveClass: "swiper-pagination-bullet-active",
          renderBullet: (index, className) =>
            `<span class="${className}" aria-label="Go to slide ${index + 1}"></span>`,
        }}
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        style={{ height: "100%" }}
      >
        {/* <PrevButton />
        <NextButton /> */}
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.title}-${index}`}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        {/* <div className="swiper-button-prev">PPP</div>
        <div className="swiper-button-next"></div> */}
      </Swiper>
    </Box>
  );
}
