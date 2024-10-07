import "./index.css";
import Block from "../Block";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { GiftIcon, HomeIcon, SniperIcon, TradeIcon, WalletIcon } from "../../../shared/assets";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Функция для вибрации
  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100); // Вибрирует на 100 миллисекунд
    }
  };

  return (
    <footer className="footer">
      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration} // Добавлен вызов вибрации
        >
          <img src={HomeIcon} alt={t("Home")} className="footer-icon" />
          <p>{t("Home")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration} // Добавлен вызов вибрации
        >
          <img src={SniperIcon} alt={t("Sniper")} className="footer-icon" />
          <p>{t("Sniper")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration} // Добавлен вызов вибрации
        >
          <img src={TradeIcon} alt={t("Trade")} className="footer-icon" />
          <p>{t("Trade")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration} // Добавлен вызов вибрации
        >
          <img src={WalletIcon} alt={t("Wallet")} className="footer-icon" />
          <p>{t("Wallet")}</p>
        </div>
      </Block>

      <Block>
        <NavLink
          to="/"
          className={`footer-item active ${location.pathname === "/airdrop" ? "active" : ""}`}
          onClick={handleVibration} // Добавлен вызов вибрации
        >
          <img src={GiftIcon} alt={t("Airdrop")} className="footer-icon" />
          <p>{t("Airdrop")}</p>
        </NavLink>
      </Block>
    </footer>
  );
};

export default Footer;
