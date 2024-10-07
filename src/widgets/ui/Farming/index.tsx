import React, { useState, useMemo } from "react";
import Block from "../Block";
import "./index.css";
import {
  useStartFarmMutation,
  useClaimFarmMutation,
} from "../../../pages/ui/AirdropPage/store";
import { useAppSelector, useAppDispatch } from "../../../app/store/hooks";
import { updateUserTokens } from "../../../app/providers/UserProvider/store/userSlice";
import { setFarmingState } from "../../../pages/ui/AirdropPage/store/slices";
import {
  selectCurrentReward,
  selectFarmingState,
} from "../../../pages/ui/AirdropPage/store/selectors";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { useUserContext } from "../../../app/providers/UserProvider/hooks/useUserContext";
import { selectFarmingData } from "../../../app/providers/UserProvider/store/selectors";
import { FarmingStatus } from "../../../pages/ui/AirdropPage/store/types";

const Farming: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [startFarm, { isLoading: isStarting }] = useStartFarmMutation();
  const [claimFarm, { isLoading: isClaiming }] = useClaimFarmMutation();
  const { setFarmingData } = useUserContext();
  const [showWave, setShowWave] = useState(false);
  const currentReward = useAppSelector(selectCurrentReward);
  const { totalDuration } = useAppSelector(selectFarmingData);
  const {
    isFarming,
    progress: progressPercentage,
    status: farmingStatus,
    remainingTime,
  } = useAppSelector(selectFarmingState);

  // Функция для вибрации
  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100); // Вибрация на 100 миллисекунд
    }
  };

  const formatTime = useMemo(() => {
    const h = Math.floor(remainingTime / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((remainingTime % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (remainingTime % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [remainingTime]);

  const handleStartFarming = async () => {
    handleVibration(); // Добавляем вибрацию при старте фарминга
    try {
      setShowWave(true);
      setTimeout(() => setShowWave(false), 1500);

      await startFarm().unwrap();

      dispatch(
        setFarmingState({
          status: FarmingStatus.START_MINING,
          isFarming: true,
          currentTotalCoinsFarmed: 0,
          progress: 0,
          remainingTime: totalDuration,
        }),
      );
    } catch (error) {
      console.error("Ошибка запуска фарминга:", error);
    }
  };

  const handleClaim = async () => {
    handleVibration(); // Добавляем вибрацию при получении награды
    try {
      setShowWave(true);
      setTimeout(() => setShowWave(false), 1000);

      const response: { coins: number } | null = await claimFarm().unwrap();

      if (response) {
        dispatch(updateUserTokens(response.coins));
      }

      dispatch(
        setFarmingState({
          status: FarmingStatus.START_MINING,
          isFarming: false,
          currentTotalCoinsFarmed: 0,
          progress: 0,
        }),
      );
      setFarmingData({ timePassed: 0, needToClaim: false });
    } catch (error) {
      console.error("Ошибка при получении награды:", error);
    }
  };

  const handleBoostClick = () => {
    handleVibration(); // Добавляем вибрацию при нажатии на кнопку Boost
    // Добавьте здесь вашу логику для Boost
  };

  return (
    <Block className="farming-container">
      <Block className={`farming-info ${showWave ? "wave-effect" : ""}`}>
        {isFarming ? (
          <>
            <Block
              className="farming-progress"
              style={{ width: `${progressPercentage}%` }}
            ></Block>
            <Block className="farming-status">
              <div className="farming-bbp">
                {t("farming")} {Number(currentReward).toFixed(3)} BBP
              </div>
              <div className="farming-timer">{formatTime}</div>
            </Block>
          </>
        ) : (
          <>
            {farmingStatus === FarmingStatus.CLAIM ? (
              <Block
                className="farming-action"
                onClick={handleClaim}
                style={{ cursor: "pointer", opacity: isClaiming ? 0.6 : 1 }}
              >
                {t("Claim")}
              </Block>
            ) : (
              <Block
                className="farming-action"
                onClick={handleStartFarming}
                style={{ cursor: "pointer", opacity: isStarting ? 0.6 : 1 }}
              >
                {t(farmingStatus.toLowerCase().replace(" ", "_"))}
              </Block>
            )}
          </>
        )}
      </Block>
      <Block className="boost-button" onClick={handleBoostClick}>
        {t("Boost")}
      </Block>
    </Block>
  );
};

export default Farming;
