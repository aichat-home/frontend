import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./index.css";
import Block from "../Block";

interface CustomSliderProps {
  slides: Array<{
    id: number;
    content: React.ReactNode;
  }>;
}

const CustomSwiper: React.FC<CustomSliderProps> = ({ slides }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={15}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="custom-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Block className="custom-slide">{slide.content}</Block>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
