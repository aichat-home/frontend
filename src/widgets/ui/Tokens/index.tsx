import React from "react";
import { useFetchMarketDataQuery } from "../../../pages/ui/HomePage/store";
import TokenItem from "./TokenItem";
import "./index.css";
import { NegativeGraphIcon, PositiveGraphicon } from "../../../shared/assets";

const TokenList: React.FC = () => {
  const { data, error, isLoading } = useFetchMarketDataQuery({
    sort_by: "total_volume",
    sort: "desc",
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;

  return (
    <div className="token-list">
      {data?.map((item) => (
        <TokenItem
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
        />
      ))}
    </div>
  );
};

export default TokenList;
