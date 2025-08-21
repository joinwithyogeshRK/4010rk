import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type DontLookChallengeProps = {
  status: 'ready' | 'active' | 'success' | 'failed';
  onComplete: (score: number) => void;
  onFail: () => void;
};

const generateRandomSequence = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const DontLookChallenge = ({ status, onComplete, onFail }: DontLookChallengeProps) => {
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showSequence, setShowSequence] = useState(true);
  const [sequenceTimer, setSequenceTimer] = useState(5);
  const [attempts, setAttempts] = useState(0);
  
  // Generate sequence when challenge starts
  useEffect(() => {
    if (status === 'active') {
      const newSequence = generateRandomSequence(6);
      setSequence(newSequence);
      setUserInput('');
      setShowSequence(true);
      setSequenceTimer(5);
      setAttempts(0);
    }
  }, [status]);
  
  // Countdown timer for memorization phase
  useEffect(() => {
    let interval: number | undefined;
    
    if (status === 'active' && showSequence && sequenceTimer > 0) {
      interval = setInterval(() => {
        setSequenceTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowSequence(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, showSequence, sequenceTimer]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toUpperCase());
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setAttempts(prev => prev + 1);
    
    if (userInput === sequence) {
      // Calculate score based on attempts
      const score = Math.max(100 - (attempts * 10), 60);
      onComplete(score);
    } else if (attempts >= 2) {
      // Fail after 3 attempts
      onFail();
    } else {
      // Clear input for next attempt
      setUserInput('');
    }
  };
  
  if (status !== 'active') return null;
  
  return (
    <div className="space-y-6">
      <div className="bg-surface border border-primary/30 p-4 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">Memorize This Sequence</h3>
          <div className="flex items-center gap-2">
            {showSequence ? (
              <>
                <Eye className="h-5 w-5 text-primary" />
                <span className="text-warning">{sequenceTimer}s left</span>
              </>
            ) : (
              <EyeOff className="h-5 w-5 text-error" />
            )}
          </div>
        </div>
        
        <div className="flex justify-center items-center h-20 bg-surface-muted rounded-md">
          {showSequence ? (
            <div className="text-3xl font-mono tracking-widest text-primary animate-pulse">
              {sequence}
            </div>
          ) : (
            <div className="text-lg text-error">
              Look away! Enter the sequence from memory.
            </div>
          )}
        </div>
      </div>
      
      {!showSequence && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sequence-input" className="block text-primary mb-2">
              Enter the sequence:
            </label>
            <input
              id="sequence-input"
              type="text"
              value={userInput}
              onChange={handleInputChange}
              maxLength={6}
              className="w-full bg-surface border border-primary/50 text-primary p-3 rounded-sm font-mono tracking-widest text-center text-xl focus:outline-none focus:border-primary"
              autoFocus
              autoComplete="off"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-foreground/70">
              Attempt {attempts + 1}/3
            </div>
            <button 
              type="submit" 
              className="hacker-btn"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DontLookChallenge;
