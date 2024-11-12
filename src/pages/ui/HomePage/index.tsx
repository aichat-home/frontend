import React, { useEffect, useState } from "react";
import "./index.css";
import TradHeader from "../../../widgets/ui/TradeHeader";
import ActionCards from "../../../widgets/ui/ActionCards";
import CryptoNews from "../../../widgets/ui/CryptoNews";
import NewsItemSkeleton from "../../../widgets/ui/CryptoNews/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import TokenItem from "../../../widgets/ui/Tokens";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-content">
      <TradHeader />
      <ActionCards />
      {isLoading ? (
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="custom-swiper"
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <NewsItemSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <CryptoNews />
      )}

      <TokenItem/>
    </div>
  );
};

export default HomePage;
