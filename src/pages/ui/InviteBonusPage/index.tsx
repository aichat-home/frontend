import React, { useEffect, useState } from 'react';
import './index.css'; 
import { useUser } from '../../../app/providers/UserProvider';
import { useCheckReferralMutation } from './store';
import { CehvronRight, SpeedIcon } from '../../../shared/assets';

import React, { useState } from 'react';
import Modal from '../../../widgets/ui/Modal'; // Импорт компонента модального окна
import './index.css';

const InviteBonusPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="invite-bonus-content">
            {/* Ваш основной контент страницы InviteBonusPage */}
            <h1>Invite Bonus Page</h1>
            {/* Остальной контент */}
          </div>
        </Modal>
      )}
    </>
  );
};

export default InviteBonusPage;

interface InviteBonusItem {
  level: string;
  description: string;
  reward: number;
  requiredReferrals: number;
}

const InviteBonusPage: React.FC = () => {
  const user = useUser();
  const [referralRewards, setReferralRewards] = useState(user?.reffer_rewards || []);
  const [checkReferral, { isLoading }] = useCheckReferralMutation();

  const inviteBonuses: InviteBonusItem[] = [
    { level: 'I', description: 'Invite 2 friends', reward: 1500, requiredReferrals: 2 },
    { level: 'II', description: 'Invite 3 friends', reward: 2000, requiredReferrals: 3 },
    { level: 'III', description: 'Invite 5 friends', reward: 3000, requiredReferrals: 5 },
    { level: 'IV', description: 'Invite 7 friends', reward: 3500, requiredReferrals: 7 },
    { level: 'V', description: 'Invite 10 friends', reward: 5000, requiredReferrals: 10 },
    { level: 'VI', description: 'Invite 15 friends', reward: 7500, requiredReferrals: 15 },
    { level: 'VII', description: 'Invite 20 friends', reward: 10000, requiredReferrals: 20 },
  ];

  const isButtonActive = (index: number) => {
    const requiredReferrals = inviteBonuses[index].requiredReferrals;
    const currentReferrals = user?.account?.reffers?.length || 0;
    
    if (currentReferrals < requiredReferrals) {
      return false;
    }

    if (index === 0) {
      return !referralRewards[index]?.claimed;
    }

    return !referralRewards[index]?.claimed && referralRewards[index - 1]?.claimed;
  };

  const handleCheckClick = async (requiredReferrals: number, index: number) => {
    if (!isButtonActive(index)) return;
  
    try {
      const response = await checkReferral({ checkCount: requiredReferrals }).unwrap();
      console.log(`Checked for ${requiredReferrals} referrals:`, response);
  
      if (response.referral_valid) {
        setReferralRewards(prevRewards =>
          prevRewards.map((reward, i) =>
            i === index ? { ...reward, claimed: true } : reward
          )
        );
      } else {
        console.log('Referral check is not valid.');
      }
    } catch (error) {
      console.error(`Error checking for ${requiredReferrals} referrals:`, error);
    }
  };
  

  useEffect(() => {
    if (user) {
      setReferralRewards(user.reffer_rewards || []);
    }
  }, [user]);

  return (
    <div className="page-content">
      <div className="farming-speed">
        <h2>Farming Speed</h2>
        <div className="farm-rates">
          <div className="farm-rate">
            <div className='row justify-center'>
              <img src={SpeedIcon} alt="" />
              <h3>{user?.plus_every_second} BBP</h3>
            </div>
            <p>Current Farm Rate</p>
          </div>
          <div className="arrow">
            <img src={CehvronRight} alt="" />
          </div>
          <div className="farm-rate">
            <div className='row justify-center'>
              <img src={SpeedIcon} alt="" />
              <h3>{(user?.next_day_plus_every_second ?? 0)} BBP</h3>
            </div>
            <p>Next Farm Rate</p>
          </div>
        </div>
      </div>

      <div className="invite-bonus-section">
        <h3>Invite Bonus</h3>
        <div className="invite-bonus-list">
          {inviteBonuses.map((item, index) => {
            const isActive = isButtonActive(index);
            const isClaimed = referralRewards[index]?.claimed;

            return (
              <div key={item.level} className="invite-bonus-item">
                <div className="level-circle">{item.level}</div>
                <div className="invite-details">
                  <p>{item.description}</p>
                  <span>{item.reward} BBP</span>
                </div>
                {isClaimed ? (
                  <div className="claimed-text">Checked</div>
                ) : (
                  <button 
                    className={`task-btn ${isActive ? 'active-check' : 'inactive-check'}`}
                    disabled={!isActive || isLoading}
                    onClick={() => handleCheckClick(item.requiredReferrals, index)}
                  >
                    {isLoading && isActive ? 'Checking...' : 'Check'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InviteBonusPage;
