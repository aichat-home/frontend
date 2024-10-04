import React, { useEffect } from "react";

import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFarmingState } from "../../../pages/ui/AirdropPage/store/slices";
import { useUserContext } from "../../providers/UserProvider/hooks/useUserContext";
import {
  selectCurrentReward,
  selectFarmingState,
} from "../../../pages/ui/AirdropPage/store/selectors";
import { selectFarmingData } from "../../providers/UserProvider/store/selectors";
import { FarmingStatus } from "../../../pages/ui/AirdropPage/store/types";
import { useNavigate } from "react-router-dom";

const Page = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, setFarmingData } = useUserContext();
  const currentReward = useAppSelector(selectCurrentReward);
  const { needToClaim, totalDuration, plusEverySecond, timePassed } =
    useAppSelector(selectFarmingData);
  const { isFarming, remainingTime } = useAppSelector(selectFarmingState);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalDuration && !timePassed) {
      dispatch(setFarmingState({ remainingTime: totalDuration }));
    }
  }, [totalDuration]);


  useEffect(() => {
    if (user?.account.heSeeWelcomeScreen === false && !localStorage.getItem('hasSeenDailyCheck')) {
      navigate('/daily-check');
      localStorage.setItem('hasSeenDailyCheck', 'true');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (needToClaim) {
      
      dispatch(
        setFarmingState({ isFarming: false, status: FarmingStatus.CLAIM }),
      );
    } else {
      const farmStatus = user?.wallet.farm?.status;
      if (
        !!farmStatus &&
        farmStatus === FarmingStatus.PROCESS &&
        timePassed > 0
      ) {
        dispatch(
          setFarmingState({ isFarming: true, status: FarmingStatus.PROCESS }),
        );
      } else {
        dispatch(
          setFarmingState({
            isFarming: false,
            status: FarmingStatus.START_MINING,
          }),
        );
      }
    }
  }, [needToClaim]);

  const updateProgress = () => {
    setFarmingData({
      timePassed: Number(totalDuration) - remainingTime,
      needToClaim,
    });
    dispatch(
      setFarmingState({
        remainingTime: remainingTime - 1,
        currentTotalCoinsFarmed:
          Number(plusEverySecond) + Number(currentReward),
      }),
    );
  };

  useEffect(() => {
    if (
      !isFarming ||
      totalDuration === undefined ||
      remainingTime === undefined
    )
      return;

    if (Number(remainingTime) <= 0) {
      setFarmingData({ timePassed: Number(totalDuration), needToClaim: true });
      dispatch(
        setFarmingState({
          isFarming: false,
          status: FarmingStatus.CLAIM,
          progress: 100,
        }),
      );
    } else {
      const newProgress =
        ((totalDuration - remainingTime) / totalDuration) * 100;
      dispatch(setFarmingState({ progress: newProgress }));

      const timer = setTimeout(() => {
        updateProgress();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isFarming, remainingTime, totalDuration]);

  return <div className="page-container">{children}</div>;
};

export default Page;
