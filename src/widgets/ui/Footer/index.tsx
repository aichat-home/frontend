import "./index.css";
import Block from "../Block";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { GiftIcon, HomeIcon, SniperIcon, TradeIcon, WalletIcon } from "../../../shared/assets";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <footer className="footer">
      <Block>
        <NavLink to="/home"
          className={`footer-item`}
          onClick={handleVibration} 
        >
          <img src={HomeIcon} alt={t("Home")} className="footer-icon" />
          <p>{t("Home")}</p>
        </NavLink>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration}
        >
          <img src={SniperIcon} alt={t("Sniper")} className="footer-icon" />
          <p>{t("Sniper")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration}
        >
          <img src={TradeIcon} alt={t("Trade")} className="footer-icon" />
          <p>{t("Trade")}</p>
        </div>
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
          onClick={handleVibration} 
        >
          <img src={WalletIcon} alt={t("Wallet")} className="footer-icon" />
          <p>{t("Wallet")}</p>
        </div>
      </Block>

      <Block>
        <NavLink
          to="/"
          className={`footer-item active ${location.pathname === "/airdrop" ? "active" : ""}`}
          onClick={handleVibration}
        >
          <img src={GiftIcon} alt={t("Airdrop")} className="footer-icon" />
          <p>{t("Airdrop")}</p>
        </NavLink>
      </Block>
    </footer>
  );
};

export default Footer;
