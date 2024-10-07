import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Block from "../Block";
import "./index.css";
import { useUser } from "../../../app/providers/UserProvider";
import {
  useTonWallet,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import Modal from "../Modal";
import { useSaveWalletAddressMutation } from "../../../app/providers/UserProvider/store";
import Button from "../Button";
import {
  CoinIcon,
  RocketIcon,
  EmptyWalletIcon,
  CupStarIcon,
  SettingIcon,
} from "../../../shared/assets/index";
import { t } from "i18next";

const Header: React.FC = () => {
  const user = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [saveWalletAddress] = useSaveWalletAddressMutation();

  const { open } = useTonConnectModal();

  // Функция для вибрации
  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100); // Вибрация на 100 миллисекунд
    }
  };

  const handleWalletClick = () => {
    handleVibration(); // Добавляем вибрацию при клике
    setModalVisible(true);
  };

  const disconnectWallet = () => {
    handleVibration(); // Добавляем вибрацию при клике
    if (tonConnectUI) {
      tonConnectUI.disconnect();
    }
  };

  useEffect(() => {
    if (wallet && userFriendlyAddress) {
      const appName = wallet.device.appName || "Unknown App";
      saveWalletAddress({ name: appName, address: userFriendlyAddress })
        .then(() => console.log("Адрес кошелька успешно сохранен"))
        .catch((error) =>
          console.error("Ошибка при сохранении адреса кошелька:", error),
        );
    }
  }, [wallet, userFriendlyAddress, saveWalletAddress]);

  return (
    <Block className="header">
      <div className="user-info">
        <Link className="invite-bonus-link" to='/invite-bonus-page' onClick={handleVibration}>
          <Block className="username">
            <img src={CoinIcon} alt="User Avatar" className="user-avatar" />
            <Block className="user-tokens">
              <span className="username">
                {user?.username || user?.first_name}
              </span>
              <Block className="token-info">
                <Block className="token-per-seconds">
                  <img src={RocketIcon} className="rocket-img" alt="Rocket" />
                  <span className="collected-tokens-amount">{user?.plus_every_second}</span>
                  <span className="tocken-name">BBP</span>
                </Block>
                <Block className="token-per-second-plus">+</Block>
              </Block>
            </Block>
          </Block>
        </Link>
      </div>

      <Block className="header-right-icons">
        <Block onClick={handleWalletClick} className="wallet-icon">
          <div>
            <img src={EmptyWalletIcon} alt="Wallet" />
          </div>
        </Block>

        <Block>
          <Link to="/leaders" onClick={handleVibration}>
            <div>
              <img src={CupStarIcon} alt="Achievements" />
            </div>
          </Link>
        </Block>
        <Block>
          <Link to="/settings" onClick={handleVibration}>
            <div>
              <img src={SettingIcon} alt="Settings" />
            </div>
          </Link>
        </Block>
      </Block>

      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)}>
        <div className="modal-body">
          {wallet ? (
            <Button onClick={disconnectWallet}>{t("disconnect_wallet")}</Button>
          ) : (
            <Button onClick={() => { handleVibration(); open(); }}>{t("connect_wallet")}</Button>
          )}
        </div>
      </Modal>
    </Block>
  );
};

export default Header;
