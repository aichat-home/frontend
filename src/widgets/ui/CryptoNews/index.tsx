import React, { useEffect, useState } from "react";
import Button from "../../../widgets/ui/Button";
import CustomSwiper from "../../../widgets/ui/Slider";
import { useFetchNewsQuery } from "../../../pages/ui/HomePage/store";
import { NewsItem } from "../../../pages/ui/HomePage/store/types";
import './index.css'


const CryptoNews: React.FC = () => {
  const { data: news, error } = useFetchNewsQuery();
  const [slides, setSlides] = useState<{ id: number; content: React.ReactNode }[]>([]);

  const truncateText = (text: string, maxLength: number): string => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    if (news) {
      const newsSlides = news.map((newsItem: NewsItem, index) => ({
        id: index, 
        content: (
          <div className="slide-content" key={index}>
            <div className="news-info">
                <div className="user-details">
                    <img
                        src={newsItem.image_url}
                        alt={newsItem.title}
                        className="news-icon"
                    />
                    <h4 className="user-name">{newsItem.creator_name}</h4>
                </div>
                <Button
                    className="more-button"
                    onClick={() => window.open(newsItem.link, "_blank")}
                >
                    More
                </Button>              
            </div>
            <div className="news-description">
            <h4 className="user-name">{truncateText(newsItem.title, 50)}</h4>
              <p className="mission-description">
                {truncateText(newsItem.description, 100)}
              </p>
            </div>
          </div>
        ),
      }));
      setSlides(newsSlides);
    }
  }, [news]);
  if (error) return <p>Failed to load news.</p>;

  return (
    <div className="news-swiper">
      <CustomSwiper slides={slides} />
    </div>
  );
};

export default CryptoNews;
