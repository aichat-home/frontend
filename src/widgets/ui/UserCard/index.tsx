import React from 'react';
import './index.css';
import Block from '../Block';
import { GiftTwoIcon, InfoIcon, MoneyReciveIcon } from '../../../shared/assets';
import { useUser } from '../../../app/providers/UserProvider';

type UserCardProps = {
  bbpAmount: string | number;
  level: number;
  swapVolume: number;
  bonus: number;
  commissionEarned: number;
};

const UserCard: React.FC<UserCardProps> = ({ bbpAmount, swapVolume, bonus, commissionEarned }) => {
  const user = useUser()


  return (
    <Block className="swap-card">
      <Block className="bbp-amount">
        <Block>
            <h2>{bbpAmount}</h2>
            <p>$BBP</p>
        </Block>
        <Block className='level-badge-block'>
            <Block className="level-badge">Lvl. {user?.current_level || 0}</Block>
        </Block>
      </Block>

      <Block className="swap-volume">
        <Block className='swap-volume-flex'>
            <Block className='my-swap-volume'>
                My Swap Volume 
                <img src={InfoIcon} alt="" />
            </Block>
            <Block className='bonus-block'>
                <img src={GiftTwoIcon} alt="" />
                <p className="bonus">Bonus: <strong>{bonus} BBP</strong></p>
            </Block>
        </Block>
        <Block className="progress-bar">
          <Block className="progress" style={{ width: `${swapVolume}%` }}></Block>
        </Block>
      </Block>

      <Block className="commission-earned">
        <p>Total Commission Earned</p>
        <Block className='money-recive'>
            <img src={MoneyReciveIcon} alt="" />
            <h3>${commissionEarned.toFixed(2)}</h3>
        </Block>
      </Block>
    </Block>
  );
};

export default UserCard;
