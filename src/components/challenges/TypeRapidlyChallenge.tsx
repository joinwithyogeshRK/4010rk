import { useState, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

type TypeRapidlyChallengeProps = {
  status: 'ready' | 'active' | 'success' | 'failed';
  onComplete: (score: number) => void;
  onFail: () => void;
};

type Trap = {
  id: number;
  position: number;
  duration: number;
  active: boolean;
};

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Hackers use keyboard shortcuts to maximize efficiency.",
  "Security through obscurity is not a viable strategy.",
  "Always validate user input to prevent injection attacks.",
  "Encryption without proper key management is useless."
];

const TypeRapidlyChallenge = ({ status, onComplete, onFail }: TypeRapidlyChallengeProps) => {
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [traps, setTraps] = useState<Trap[]>([]);
  const [trapWarning, setTrapWarning] = useState(false);
  const [completedSentences, setCompletedSentences] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize challenge
  useEffect(() => {
    if (status === 'active') {
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      setCurrentSentence(randomSentence);
      setUserInput('');
      setTraps([]);
      setTrapWarning(false);
      setCompletedSentences(0);
      setErrors(0);
      
      // Focus the input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [status]);
  
  // Generate traps periodically
  useEffect(() => {
    if (status !== 'active') return;
    
    const trapInterval = setInterval(() => {
      if (Math.random() > 0.3) return; // 30% chance to create a trap
      
      const newTrap: Trap = {
        id: Date.now(),
        position: Math.floor(Math.random() * currentSentence.length),
        duration: 2000 + Math.random() * 2000, // 2-4 seconds
        active: true
      };
      
      setTraps(prev => [...prev, newTrap]);
      
      // Show warning
      setTrapWarning(true);
      setTimeout(() => setTrapWarning(false), 1000);
      
      // Remove trap after its duration
      setTimeout(() => {
        setTraps(prev => prev.filter(trap => trap.id !== newTrap.id));
      }, newTrap.duration);
      
    }, 3000); // Try to create a trap every 3 seconds
    
    return () => clearInterval(trapInterval);
  }, [status, currentSentence]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    
    // Check if user typed into a trap
    const currentPosition = newInput.length - 1;
    const hitTrap = traps.some(trap => trap.active && trap.position === currentPosition);
    
    if (hitTrap) {
      setErrors(prev => prev + 1);
      if (errors >= 2) { // 3 errors total (starting from 0)
        onFail();
        return;
      }
    }
    
    setUserInput(newInput);
    
    // Check if sentence is completed correctly
    if (newInput === currentSentence) {
      // Move to next sentence or complete challenge
      setCompletedSentences(prev => prev + 1);
      
      if (completedSentences >= 2) { // 3 sentences total (starting from 0)
        // Calculate score based on errors
        const score = Math.max(100 - (errors * 15), 60);
        onComplete(score);
      } else {
        // Get next sentence
        let nextSentence;
        do {
          nextSentence = sentences[Math.floor(Math.random() * sentences.length)];
        } while (nextSentence === currentSentence);
        
        setCurrentSentence(nextSentence);
        setUserInput('');
        setTraps([]);
      }
    }
  };
  
  if (status !== 'active') return null;
  
  return (
    <div className="space-y-6">
      <div className="bg-surface border border-primary/30 p-4 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">Type Rapidly</h3>
          <div className="flex items-center gap-2">
            <span className="text-primary">
              {completedSentences + 1}/3 Sentences
            </span>
            <span className="text-error">
              {errors}/3 Errors
            </span>
          </div>
        </div>
        
        {trapWarning && (
          <div className="flex items-center gap-2 mb-4 text-warning animate-pulse">
            <AlertTriangle className="h-5 w-5" />
            <p>Digital trap detected! Type carefully!</p>
          </div>
        )}
        
        <div className="relative font-mono text-lg mb-6 bg-surface-muted p-4 rounded-md">
          {currentSentence.split('').map((char, index) => {
            const isTrap = traps.some(trap => trap.position === index);
            const isTyped = index < userInput.length;
            const isCorrect = isTyped && userInput[index] === char;
            const isWrong = isTyped && userInput[index] !== char;
            
            return (
              <span 
                key={index}
                className={`
                  ${isTrap ? 'text-error animate-glitch' : ''}
                  ${isCorrect ? 'text-success' : ''}
                  ${isWrong ? 'text-error' : ''}
                  ${!isTyped ? 'text-foreground/70' : ''}
                `}
              >
                {char}
              </span>
            );
          })}
        </div>
        
        <div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full bg-surface border border-primary/50 text-primary p-3 rounded-sm font-mono focus:outline-none focus:border-primary"
            autoFocus
            autoComplete="off"
          />
        </div>
      </div>
      
      <div className="text-foreground/70">
        <p>Type the sentence exactly as shown. Watch out for digital traps!</p>
        <p>Progress: {completedSentences}/3 sentences completed</p>
      </div>
    </div>
  );
};

export default TypeRapidlyChallenge;
