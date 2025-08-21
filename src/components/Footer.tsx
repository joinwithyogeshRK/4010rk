import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-primary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-primary">Hacker Challenge Cards</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <Link to="/" className="text-foreground/70 hover:text-primary transition-colors text-center md:text-left">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-foreground/70 hover:text-primary transition-colors text-center md:text-left">
              Leaderboard
            </Link>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-center md:text-left">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-center md:text-left">
              Terms of Service
            </a>
          </div>
          
          <div className="text-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} Hacker Challenge Cards. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
