import React, { useState } from "react";
import "./index.css";
import { BuyIcon, TtrashIcon } from "../../../../shared/assets";

interface TokenItemProps {
  image: string;
  name: string;
  symbol: string;
  total_volume: number;
  market_cap: number;
  price: number;
  price_change_percentage_24h: number;
  positiveGraph: string;
  negativeGraph: string;
  onRemove: () => void;
  onBuy: () => void;
}

const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  } else {
    return value.toString();
  }
};

const SwipeableTokenItem: React.FC<TokenItemProps> = ({
  image,
  name,
  symbol,
  total_volume,
  market_cap,
  price,
  price_change_percentage_24h,
  positiveGraph,
  negativeGraph,
  onRemove,
  onBuy,
}) => {
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false); // Для блокировки резких движений

  const MAX_SWIPE_DISTANCE = 150; // Максимальное расстояние для свайпа

  // Начало касания
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true); // Начинаем свайп
  };

  // Движение касания
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null && isSwiping) {
      const touchCurrentX = e.touches[0].clientX;
      const moveDistance = touchCurrentX - touchStartX; // Отслеживаем движение пальца

      // Если движение влево, ограничиваем по MAX_SWIPE_DISTANCE
      if (moveDistance < 0 && Math.abs(moveDistance) <= MAX_SWIPE_DISTANCE) {
        setSwipeDistance(Math.abs(moveDistance)); // Двигаем влево
      }
      // Если движение вправо, ограничиваем до исходного положения (не дальше 0)
      else if (moveDistance > 0 && swipeDistance > 0) {
        setSwipeDistance(Math.max(0, swipeDistance - moveDistance)); // Двигаем вправо
      }
    }
  };

  // Окончание касания
  const handleTouchEnd = () => {
    if (swipeDistance > MAX_SWIPE_DISTANCE / 2) {
      setSwipeDistance(MAX_SWIPE_DISTANCE); // Если движение большое, оставить открытым
    } else {
      setSwipeDistance(0); // Возвращаем в исходное положение
    }
    setIsSwiping(false); // Завершаем свайп
    setTouchStartX(null); // Сбрасываем начальную точку
  };

  const graphImage =
    price_change_percentage_24h >= 0 ? positiveGraph : negativeGraph;

  return (
    <div className="swipeable-token-item">
      <div
        className="token-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(-${swipeDistance}px)` }}
      >
        <div className="token-image">
          <div className="token-name">
            <img src={image} alt={name} />
            <h2>{symbol.toUpperCase()}</h2>
          </div>
          <p>Vol {formatNumber(total_volume)}</p>
        </div>
        <div className="token-details">
          <div className="mcap-graph">
            <img src={graphImage} alt="Graph" className="graph-image" />
            <p>MCap {formatNumber(market_cap)}</p>
          </div>
          <div className="token-price">${price.toFixed(4)}</div>
        </div>
        <div className="token-price-change">
          <span
            className={`price-change ${
              price_change_percentage_24h >= 0 ? "positive" : "negative"
            }`}
          >
            {price_change_percentage_24h >= 0 ? "+" : ""}
            {price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </div>
      <div
        className="swipe-actions"
        style={{
          opacity: swipeDistance === MAX_SWIPE_DISTANCE ? 1 : 0,
          pointerEvents: swipeDistance === MAX_SWIPE_DISTANCE ? "all" : "none",
        }}
      >
        <button className="remove-btn" onClick={onRemove}>
          <img src={TtrashIcon} alt="" />
          Remove
        </button>
        <button className="buy-btn" onClick={onBuy}>
          <img src={BuyIcon} alt="" />
          Buy
        </button>
      </div>
    </div>
  );
};

export default SwipeableTokenItem;
