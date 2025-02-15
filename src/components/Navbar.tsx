import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Film, Tv, Clapperboard } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Film className="h-8 w-8" />
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Goonflix
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/movies" 
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-text-secondary transition-all hover:bg-secondary-hover hover:text-text"
          >
            <Film size={18} />
            Movies
          </Link>
          <Link 
            to="/shows" 
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-text-secondary transition-all hover:bg-secondary-hover hover:text-text"
          >
            <Tv size={18} />
            Shows
          </Link>
          <Link 
            to="/anime" 
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-text-secondary transition-all hover:bg-secondary-hover hover:text-text"
          >
            <Clapperboard size={18} />
            Anime
          </Link>
          <Link 
            to="/settings" 
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2 text-text-secondary transition-all hover:bg-secondary-hover hover:text-text"
          >
            <Settings size={18} />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}