import {  Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Footer from "../../../widgets/ui/Footer";
import { useEffect } from "react";
import { useBackButton } from "@telegram-apps/sdk-react";

const Layout = () => {
  const backBtn = useBackButton()
  const navigate = useNavigate();

  useEffect(() => {
    console.log("location", location)
    if (location.pathname !== "/") {
      backBtn.on("click", () => {
        navigate('/')
      })
      backBtn.show()
    } else {
      backBtn.hide()
      backBtn.off("click", () => {})
    }
  }, [location])
  return (
    <div className="layout-container">
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
