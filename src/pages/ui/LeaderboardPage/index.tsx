import React from "react";
import "./index.css";
import Block from "../../../widgets/ui/Block";
import TopRankItem from "./TopRankItem";
import { useFetchLeaderboardQuery } from "./store";
import {
  CupIcon,
  OnePlaceIcon,
  TwoPlaceIcon,
  ThreePlaceIcon,
} from "../../../shared/assets/index";
import { useUser } from "../../../app/providers/UserProvider";
import { t } from "i18next";


const WallOfFame: React.FC = () => {
  const { data: leaderboardData, isLoading } = useFetchLeaderboardQuery();
  const user = useUser();

  const avatarColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#33FFF3",
    "#F3FF33",
    "#A833FF",
    "#FFA833",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
  };

  const rankIcons = [OnePlaceIcon, TwoPlaceIcon, ThreePlaceIcon];

  const topRankData = leaderboardData?.leaderboard || [
    { id: 1, username: "BitGraf", coins: 8556, rank: 1, icon: rankIcons[0] },
    { id: 2, username: "BitGraf", coins: 8556, rank: 2, icon: rankIcons[1] },
    { id: 3, username: "BitGraf", coins: 8556, rank: 3, icon: rankIcons[2] },
  ];

  if (!user) {
    return <div>{t("loading")}</div>; 
  }

  return (
    <Block className="wall-of-fame">
      <div className="header leaderboard-header">
        <h2>{t("wall_of_fame")}</h2>
        <p>{t("ascend_to_greatness")}</p>
        <img src={CupIcon} alt={t("trophy")} />
      </div>

      <Block className="highlighted-rank">
        <div className="avatar" style={{ backgroundColor: getRandomColor() }}>
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="info">
          <h3>{user.username}</h3>
          <span>{user.wallet.coins.toLocaleString()} BBP</span>
        </div>
        <div className="rank-number">#{leaderboardData?.user_rank}</div>
      </Block>

      <Block className="top-rank-section">
        <h3>{t("top_rank")}</h3>
        {isLoading ? (
          <p>{t("loading")}</p> 
        ) : (
          <>
            {topRankData.slice(0, 3).map((item, index) => (
              <TopRankItem
                key={item.id}
                id={item.id}
                username={item.username}
                score={item.coins.toLocaleString()}
                rank={index + 1}
                icon={rankIcons[index]}
                backgroundColor={getRandomColor()}
                style={
                  {
                    "--animation-delay": `${index * 0.3}s`,
                  } as React.CSSProperties
                }
              />
            ))}
            {topRankData.slice(3).map((item, index) => (
              <TopRankItem
                key={item.id}
                id={item.id}
                username={item.username}
                score={item.coins.toLocaleString()}
                rank={index + 4}
                icon={null}
                backgroundColor={getRandomColor()}
                style={
                  {
                    "--animation-delay": `${(index + 3) * 0.3}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </>
        )}
      </Block>
    </Block>
  );
};

export default WallOfFame;
