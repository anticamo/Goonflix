import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import { tmdbConfig } from '../config/tmdb';

interface FeaturedSliderProps {
  movies: Movie[];
}

export function FeaturedSlider({ movies }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredMovies = movies.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % featuredMovies.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((current) => 
      current === 0 ? featuredMovies.length - 1 : current - 1
    );
  };

  const currentMovie = featuredMovies[currentIndex];

  if (!currentMovie) return null;

  return (
    <div className="relative mb-16 h-[70vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${tmdbConfig.image.url}/${tmdbConfig.image.backdrop}${currentMovie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-12">
        <button
          onClick={prevSlide}
          className="rounded-full bg-background/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-background/40"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full bg-background/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-background/40"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-12">
        <h1 className="mb-4 text-5xl font-bold text-white">{currentMovie.title}</h1>
        <p className="mb-6 max-w-2xl text-lg text-text-secondary">{currentMovie.overview}</p>
        <Link
          to={`/watch/${currentMovie.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-hover"
        >
          <Play size={24} />
          Watch Now
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 w-12 rounded-full transition-all ${
              currentIndex === index ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}