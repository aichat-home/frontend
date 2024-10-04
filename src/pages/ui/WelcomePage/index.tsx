import React, { useState, useEffect } from 'react';
import './index.css';
import { useUser } from '../../../app/providers/UserProvider';

interface CheckInItem {
  day: number;
  status: 'done' | 'now' | 'pending';
  farmRate: string;
}

const DailyCheckInPage: React.FC = () => {
  const user = useUser();

  const currentDay = user?.wallet.reward.day ?? 1;
  const showWelcomeScreen = user?.account.heSeeWelcomeScreen ?? true;

  console.log('Current Day:', currentDay);

  const checkInItems: CheckInItem[] = [
    { day: 1, status: 'pending', farmRate: '0.01 / 1s' },
    { day: 2, status: 'pending', farmRate: '0.02 / 1s' },
    { day: 3, status: 'pending', farmRate: '0.03 / 1s' },
    { day: 4, status: 'pending', farmRate: '0.03 / 1s' },
    { day: 5, status: 'pending', farmRate: '0.04 / 1s' },
    { day: 6, status: 'pending', farmRate: '0.04 / 1s' },
    { day: 7, status: 'pending', farmRate: '0.05 / 1s' },
  ];

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  const updatedCheckInItems = checkInItems.map((item) => {
    if (item.day < currentDay) {
      return { ...item, status: 'done' }; 
    }
    if (item.day === currentDay) {
      return { ...item, status: 'now' };
    }
    return { ...item, status: 'pending' };
  });

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const savedStartTime = localStorage.getItem('dayStartTime');
    let startTime: number;

    if (savedStartTime) {
      startTime = parseInt(savedStartTime, 10);
    } else {
      startTime = Date.now();
      localStorage.setItem('dayStartTime', startTime.toString());
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const endOfDay = new Date();
      endOfDay.setHours(24, 0, 0, 0);
      const timeLeft = endOfDay.getTime() - now;

      setTime(timeLeft > 0 ? Math.floor(timeLeft / 1000) : 0);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="daily-checkin-page">
      <h2>Daily Check-in</h2>
      <p>Build your streak for a farming boost!<br />Missing a day means bonuses are reset.</p>

      <div className="timer">{formatTime(time)}</div>

      <div className="checkin-list">
        {updatedCheckInItems.map((item, index) => (
          <div key={item.day} className={`checkin-item ${item.status}`}>
            <div className={`day-circle ${item.status}`}>
              <span className="day-number">{romanNumerals[index]}</span>
            </div>
            <div className="checkin-details column">
              <p>Day {item.day}</p>
              <span>{item.status === 'now' ? 'Now' : item.status === 'done' ? 'Done' : 'Pending'}</span>
            </div>
            <div className="about-daily-farm column">
              <div>Farm</div>
              <span>{item.farmRate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyCheckInPage;
