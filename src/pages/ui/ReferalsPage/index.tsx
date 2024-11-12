import React from "react";
import "./index.css";
import Block from "../../../widgets/ui/Block";
import Button from "../../../widgets/ui/Button";
import { useFetchReferralsQuery } from "./store";
import { StarValueIcon } from "../../../shared/assets";
import { useUser } from "../../../app/providers/UserProvider";

const InviteFriends: React.FC = () => {
  const userData = useUser();
  const inviteCode = userData?.account?.inviteCode;

  const {
    data: referrals = [],
    isLoading,
    error,
  } = useFetchReferralsQuery(
    { initData: userData?.id?.toString() || "" },
    { skip: !userData },
  );

  const openTelegramChat = () => {
    if (!inviteCode) return;
    const telegramUrl = `https://t.me/share/url?url=https://t.me/tap_your_coin_bot/TYC?startapp=${encodeURIComponent(inviteCode)}&text=Join me in mining BeamBot and get free coins! 🔥`;
    console.log(telegramUrl);

    window.open(telegramUrl, "_blank");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load referrals.</p>;
  }

  const avatarColors = ["#111827", "#111827"];
  const getRandomColor = (index: number) =>
    avatarColors[index % avatarColors.length];

  return (
    <Block className="invite-friends-container">
      <Block className="leaderboard-header">
        <div>Invite Friends & <br />
        Earn Comissions</div>
        <p>Your total earnings via commissions. 
        Funds automatically added to your wallet.</p>
        <Block className="stars-section">
          <Block>
            <div className="stars-value">
              <div >
                <img src={StarValueIcon} alt="" />
              </div>
              <div className="stars-price">
                $ 0
              </div>
            </div>
            <div>
            <Button className="stars-claim">
              Claim
            </Button>
            </div>
          </Block>
          <Block></Block>
        </Block>
      </Block>

      <Button className="invite-button" onClick={openTelegramChat}>
        Invite friends
      </Button>
      <Block className="earn-ref-text">
        Earn 10% of all your Friend’s points.
      </Block>


      <Block className="friends-list">
        {referrals.map((referral, index) => (
          <Block className="friend-item" key={referral.id}>
            <div
              className="avatar"
              style={{ backgroundColor: getRandomColor(index) }}
            >
              {referral.user.username ? referral.user.username.slice(0, 2).toUpperCase() 
               : `${referral.user.first_name.slice(0, 1).toUpperCase()}${referral.user.last_name.slice(0, 1).toUpperCase()}`}


            </div>
            <div className="friend-info">
              <h4>{referral.user.username ? referral.user.username : `${referral.user.first_name} ${referral.user.last_name}`}</h4>
              <span>{referral.earned_coins.toLocaleString()} BBP</span>
            </div>
          </Block>
        ))}
      </Block>
    </Block>
  );
};

export default InviteFriends;
