import { useState, useEffect } from 'react';

type TimerProps = {
  initialTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
};

const Timer = ({ initialTime, isRunning, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onTimeUp]);
  
  const getTimerClass = () => {
    if (timeLeft <= 5) return 'countdown-timer-danger animate-pulse';
    if (timeLeft <= 10) return 'countdown-timer-warning';
    return 'countdown-timer';
  };
  
  return (
    <div className={getTimerClass()}>
      {timeLeft.toString().padStart(2, '0')}s
    </div>
  );
};

export default Timer;
