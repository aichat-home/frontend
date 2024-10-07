import "./index.css";
import Block from "../../../widgets/ui/Block";
import { useUser } from "../../../app/providers/UserProvider";
import MissionSlider from "../../../widgets/ui/Swiper";
import Farming from "../../../widgets/ui/Farming";
import Header from "../../../widgets/ui/GameHeader";
import Tasks from "../../../widgets/ui/Tasks";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { FriendsIcon, InfoIcon, PercentageCircleIcon, StarsIcon } from "../../../shared/assets";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/store/hooks";
import { selectUserCoins } from "../../../app/providers/UserProvider/store/selectors";
import { useState } from "react";
import Modal from "../../../widgets/ui/Modal";

const Airdrop = () => {
  const user = useUser();
  const userCoins = useAppSelector(selectUserCoins)
  const [isModalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();

  const formatCoins = (coins: number) => {
    if (coins >= 1000000) {
      return `${Math.floor(coins / 1000000)}M`;
    } else if (coins >= 1000) {
      return `${Math.floor(coins / 1000)}K`;
    } else {
      return Math.floor(coins); 
    }
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div className="airdrop-container">
      <Header />

      <Block>
        <div className="user-stats">
          <div className="stat">
            <div className="bold">BBP</div>
            <div className="user-stats-stars">
            <div className="gray">+ {formatCoins(userCoins)}</div>
              <div>
                <img src={StarsIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="stat" onClick={toggleModal}>
            <div className="commission-header">
              <div className="bold">{t("Commission")}</div>
              <img src={InfoIcon} alt="" className="info-icon" />
            </div>
            <div className="user-stats-commision">
              <div className="gray">$--</div>
              <div className="flex">
                <img src={PercentageCircleIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="stat">
            <div className="bold">{t("Invites")}</div>
            <div className="user-stats-invites">
              <div className="gray">+{user?.account?.reffers?.length || "0"}</div>
              <div>
                <Link to='/ref'>
                    <img src={FriendsIcon} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Block>

      <Modal isVisible={isModalVisible} onClose={toggleModal} className="custom-modal">
        <div className="modal-content">
          <h2 className="modal-title">{t('commissions_outline_title')}</h2>
          <p>{t('commissions_outline_text_1')}</p>
          <p>{t('commissions_outline_text_2')}</p>
          <p>{t('commissions_outline_text_3')}</p>
          <p>{t('commissions_outline_text_4')}</p>
          <p>{t('commissions_outline_text_5')}</p>
        </div>
      </Modal>


      <MissionSlider />

      <Farming />

      <Tasks />
    </div>
  );
};

export default Airdrop;
