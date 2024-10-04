// MissionSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import { Pagination } from "swiper/modules";
import Button from "../Button";
import Block from "../Block";

interface Mission {
  id: number;
  name: string;
  description: string;
  link: string;
}

const missionsData: Mission[] = [
  {
    id: 1,
    name: "Join our Channel",
    description: "Catch the latest updates",
    link: "https://t.me/BeambotXYZ",
  },
  {
    id: 2,
    name: "Join our Chat",
    description: "Meet the community and chat with users",
    link: "https://t.me/beambotchat",
  },
  { id: 3,
    name: 'Follow us on X',
    description: 'Drop us a follow for the latest updates',
    link: 'https://x.com/BeamBotXYZ'
   },
];

const MissionSlider: React.FC = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {missionsData.map((mission) => (
        <SwiperSlide key={mission.id}>
          <div className="mission-slide">
            <h3 className="mission-name">{mission.name}</h3>
            <p className="mission-description">{mission.description}</p>
            <Block className="swiper-mission-btn">
              <Button>Follow</Button>
            </Block>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MissionSlider;
