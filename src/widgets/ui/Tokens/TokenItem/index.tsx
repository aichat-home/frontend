import React from "react";
import "./index.css";

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
}

// Функция для форматирования чисел в тысячи, миллионы и миллиарды
const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`; // Миллиарды
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`; // Миллионы
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`; // Тысячи
  } else {
    return value.toString(); // Меньше тысячи — показываем как есть
  }
};

const TokenItem: React.FC<TokenItemProps> = ({
  image,
  name,
  symbol,
  total_volume,
  market_cap,
  price,
  price_change_percentage_24h,
  positiveGraph,
  negativeGraph,
}) => {
  const graphImage =
    price_change_percentage_24h >= 0 ? positiveGraph : negativeGraph;

  return (
    <div className="token-item">
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
        <div className="token-price">{price.toFixed(4)}</div>
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
  );
};

export default TokenItem;
