import React from "react";
import { useFetchMarketDataQuery } from "../../../pages/ui/HomePage/store";

import "./index.css";
import { NegativeGraphIcon, PositiveGraphicon } from "../../../shared/assets";
import SwipeableTokenItem from "./TokenItem";

const TokenList: React.FC = () => {
  const { data, error, isLoading } = useFetchMarketDataQuery({
    sort_by: "total_volume",
    sort: "desc",
  });

  const handleRemove = (tokenName: string) => {
    alert(`Токен ${tokenName} удален`);
  };

  const handleBuy = (tokenName: string) => {
    alert(`Покупка токена ${tokenName}`);
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;
  if (!data || data.length === 0) return <p>Нет данных для отображения</p>;

  return (
    <div className="token-list">
      {data.map((item) => (
        <SwipeableTokenItem
          key={item.address}
          image={item.image}
          name={item.name}
          symbol={item.symbol}
          total_volume={item.total_volume}
          market_cap={item.market_cap}
          price={item.price}
          price_change_percentage_24h={item.price_change_percentage_24h}
          positiveGraph={PositiveGraphicon}
          negativeGraph={NegativeGraphIcon}
          onRemove={() => handleRemove(item.name)} 
          onBuy={() => handleBuy(item.name)}
        />
      ))}
    </div>
  );
};

export default TokenList;
