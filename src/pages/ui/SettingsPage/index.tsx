import React, { useState } from "react";
import "./index.css";
import Header from "../../../widgets/ui/GameHeader";
import Block from "../../../widgets/ui/Block";
import Modal from "../../../widgets/ui/Modal";
import { useTranslation } from "../../../../node_modules/react-i18next";
import Button from "../../../widgets/ui/Button";

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setModalVisible(false);
  };

  // Определяем, какой язык отображать
  const currentLanguageLabel = i18n.language === "ru" ? t("russian") : t("english");

  return (
    <Block className="settings-container">
      <Header />
      <Block className="settings-section">
        <h3 className="section-title">{t("general")}</h3>
        <Block className="settings-item" onClick={() => setModalVisible(true)}>
          <span className="settings-label">{t("language")}</span>
          <span className="settings-value">{currentLanguageLabel} &gt;</span>
        </Block>
      </Block>
      <Modal isVisible={isModalVisible} onClose={() => setModalVisible(false)} className="language-modal">
        <Block onClick={() => changeLanguage("en")}>
          <Button className="language-btn">{t("english")}</Button>
        </Block>
        <Block onClick={() => changeLanguage("ru")}>
          <Button className="language-btn">{t("russian")}</Button>
        </Block>
      </Modal>
    </Block>
  );
};

export default SettingsPage;
