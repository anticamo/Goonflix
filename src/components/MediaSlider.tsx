import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import { tmdbConfig } from '../config/tmdb';

interface MediaSliderProps {
  title: string;
  items: Movie[];
}

export function MediaSlider({ title, items }: MediaSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxSlides = Math.min(Math.ceil(items.length / 4) - 1, 3); // Max 4 slides
  const visibleItems = items.slice(currentSlide * 4, (currentSlide + 1) * 4);

  const nextSlide = () => {
    setCurrentSlide(current => Math.min(current + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(current => Math.max(current - 1, 0));
  };

  return (
    <div className="relative mb-12">
      <h2 className="mb-6 text-2xl font-bold text-text">{title}</h2>
      <div className="relative">
        <div className="flex gap-6">
          {visibleItems.map((item) => (
            <div key={item.id} className="w-1/4 animate-fade-in">
              <div className="group relative overflow-hidden rounded-xl">
                <img
                  src={`${tmdbConfig.image.url}/${tmdbConfig.image.poster}${item.poster_path}`}
                  alt={item.title}
                  className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link
                    to={`/watch/${item.id}`}
                    className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition-transform duration-300 hover:bg-primary-hover group-hover:scale-110"
                  >
                    <Play size={20} />
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="absolute -left-12 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-text-secondary transition-colors hover:bg-secondary-hover hover:text-text"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {currentSlide < maxSlides && (
          <button
            onClick={nextSlide}
            className="absolute -right-12 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-2 text-text-secondary transition-colors hover:bg-secondary-hover hover:text-text"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: maxSlides + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 w-8 rounded-full transition-all ${
                currentSlide === index ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}