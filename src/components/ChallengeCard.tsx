import { Clock } from 'lucide-react';

type ChallengeCardProps = {
  challenge: {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    timeLimit: number;
  };
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const ChallengeCard = ({
  challenge,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick
}: ChallengeCardProps) => {
  const { title, description, difficulty, timeLimit } = challenge;
  
  return (
    <div 
      className={`group hacker-card cursor-pointer transition-all duration-300 ${isHovered ? 'shadow-neon-green scale-105' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="hacker-card-front">
        <div>
          <h3 className="card-title">{title}</h3>
          <p className="group-hover:opacity-70 transition-opacity mb-4">{description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="bg-primary/20 text-primary text-sm px-2 py-1 rounded">
            {difficulty}
          </span>
          <span className="bg-primary/20 text-primary text-sm px-2 py-1 rounded flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeLimit}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
