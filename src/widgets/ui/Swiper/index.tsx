import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import { Pagination } from "swiper/modules";
import Button from "../Button";
import Block from "../Block";
import { t } from "i18next";

interface Mission {
  id: number;
  name: string;
  description: string;
  link: string;
}

const missionsData: Mission[] = [
  {
    id: 1,
    name: "join_channel",
    description: "join_channel_message",
    link: "https://t.me/BeambotXYZ",
  },
  {
    id: 2,
    name: "join_chat",
    description: "join_chat_message",
    link: "https://t.me/beambotchat",
  },
  {
    id: 3,
    name: "follow_us_on_x",
    description: "follow_us_message",
    link: "https://x.com/BeamBotXYZ",
  },
];

const MissionSlider: React.FC = () => {

  const handleButtonClick = (url: string) => {
    window.open(url, "_blank");
  };

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
            <h3 className="mission-name">{t(mission.name)}</h3>
            <p className="mission-description">{t(mission.description)}</p>
            <Block className="swiper-mission-btn">
              <Button onClick={() => handleButtonClick(mission.link)}>{t("Follow")}</Button>
            </Block>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MissionSlider;
