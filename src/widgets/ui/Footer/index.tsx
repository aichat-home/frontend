import "./index.css";
import Block from "../Block";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { GiftIcon, HomeIcon, SniperIcon, TradeIcon, WalletIcon } from "../../../shared/assets";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <footer className="footer">
      <Block>
        {/* <NavLink
          to="/"
          className={`footer-item ${location.pathname === "/" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
        >
          <img
            src={HomeIcon}
            alt={t("Home")}
            className="footer-icon"
          />
          <p>{t("Home")}</p>
          </div>
        {/* </NavLink> */}
      </Block>
      <Block>
        {/* <NavLink
          to="/"
          className={`footer-item ${location.pathname === "/portfolio" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
        >
          <img
            src={SniperIcon}
            alt={t("Sniper")}
            className="footer-icon"
          />
          <p>{t("Sniper")}</p>
          </div>
        {/* </NavLink> */}
      </Block>

      <Block>
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
        >
          <img
            src={TradeIcon}
            alt={t("Trade")}
            className="footer-icon"
          />
          <p>{t("Trade")}</p>
        </div>
      </Block>

      <Block>
        {/* <NavLink
          to="/"
          className={`footer-item ${location.pathname === "/wallet" ? "active" : ""}`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <div
          className={`footer-item disable ${location.pathname === "/trade" ? "active" : ""}`}
        >
          <img
            src={WalletIcon}
            alt={t("Wallet")}
            className="footer-icon"
          />
          <p>{t("Wallet")}</p>
          </div>
        {/* </NavLink> */}
      </Block>


      <Block>
        <NavLink
          to="/"
          className={`footer-item active ${location.pathname === "/airdrop" ? "active" : ""}`}
        >
          <img
            src={GiftIcon}
            alt={t("Airdrop")}
            className="footer-icon"
          />
          <p>{t("Airdrop")}</p>
        </NavLink>
      </Block>
    </footer>
  );
};

export default Footer;
