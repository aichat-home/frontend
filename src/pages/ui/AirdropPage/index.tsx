import "./index.css";
import Block from "../../../widgets/ui/Block";
import MissionSlider from "../../../widgets/ui/Swiper";
import Farming from "../../../widgets/ui/Farming";
import Header from "../../../widgets/ui/GameHeader";
import Tasks from "../../../widgets/ui/Tasks";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { CardSwapIcon, FriendsIcon, PercentageCircleIcon,  TaskIcon } from "../../../shared/assets";
import { useAppSelector } from "../../../app/store/hooks";
import { selectUserCoins } from "../../../app/providers/UserProvider/store/selectors";
import { useState } from "react";
import Modal from "../../../widgets/ui/Modal";
import InviteFriends from "../ReferalsPage";
import UserCard from "../../../widgets/ui/UserCard";
import { useUser } from "../../../app/providers/UserProvider";


const Airdrop = () => {
  const user = useUser()
  const userCoins = useAppSelector(selectUserCoins)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRefModalVisible, setRefModalVisible] = useState(false);

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
  
  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleRefModal = () => setRefModalVisible(!isRefModalVisible);

  return (
    <div className="airdrop-container">
      <Header />
      <UserCard
          bbpAmount={formatCoins(userCoins ?? 0)}
          level={user?.current_level || 0}
          swapVolume={0.5}
          bonus={1}
          commissionEarned={1.5}
        />
      <Block>
        <div className="user-stats">
          <div className="stat">
            <div className="bold">{t("Overview")}</div>
            <div className="user-stats-stars">
              <div className="flex">
                <img src={PercentageCircleIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="stat" onClick={toggleModal}>
            <div className="commission-header">
              <div className="bold">{t("Tasks")}</div>
            </div>
            <div className="user-stats-commision">
              <div className="flex">
                <img src={TaskIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="stat" onClick={toggleRefModal}>
            <div className="bold">{t("Invite")}</div>
            <div className="user-stats-invites">
              <div className="flex">
                <img src={FriendsIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Block>

      <Modal isVisible={isModalVisible} onClose={toggleModal} className="custom-modal">
        <div className="modal-content">
          <h2 className="modal-title">{t('Tasks')}</h2>
          <p className="tasks-info">{t("complete_tasks_to_earn")}</p>
          <Block className="card-swap-block">
            <div>
              <img src={CardSwapIcon} alt="" />
            </div>
          </Block>

          <Tasks/>
        </div>
      </Modal>

      <Modal isVisible={isRefModalVisible} onClose={toggleRefModal} className="custom-modal invite-friends-modal">
        <InviteFriends />
      </Modal>

      <MissionSlider />
      <Farming />
      <Tasks />
    </div>
  );
};

export default Airdrop;
