import React from "react";
import "./index.css";
import { Assetsicon, Swapicon, Timericon } from "../../../shared/assets";
import Block from "../Block";
// import Button from "../Button";
// import CustomSwiper from "../Slider";

const ActionCards: React.FC = () => {
  return (
    <div className="action-cards-container">
        <Block className="action-card">
            <Block className="action-section">
                <Block>
                    <span>
                        Assets
                    </span>
                    <img src={Assetsicon} alt="" />
                </Block>
                <Block>
                    <span>
                        Orders
                    </span>
                    <img src={Timericon} alt="" />
                </Block>
                <Block>
                    <span>
                        ...
                    </span>
                    <img src={Swapicon} alt="" />
                </Block>
                <Block>
                    <span>
                        More
                    </span>
                    <img src={Swapicon} alt="" />
                </Block>
            </Block>
        </Block>
    </div>
  );
};

export default ActionCards;
