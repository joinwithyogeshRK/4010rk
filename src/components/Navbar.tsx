import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Terminal, Trophy, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-primary">Hacker Challenge Cards</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-foreground hover:text-primary transition-colors">
              Leaderboard
            </Link>
            <div className="h-6 w-px bg-primary/30"></div>
            <button className="hacker-btn flex items-center gap-2">
              <User className="h-4 w-4" />
              Login
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-primary/30 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
            <div className="h-px w-full bg-primary/30 my-2"></div>
            <button className="hacker-btn flex items-center gap-2 justify-center">
              <User className="h-4 w-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
