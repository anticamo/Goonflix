import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import { tmdbConfig } from '../config/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `${tmdbConfig.image.url}/${tmdbConfig.image.poster}${movie.poster_path}`;

  return (
    <div className="movie-card group">
      <img
        src={posterUrl}
        alt={movie.title}
        className="h-[400px] w-full object-cover"
      />
      <div className="movie-card-content">
        <h3 className="mb-2 text-lg font-bold text-white">{movie.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-text-secondary">
          {movie.overview}
        </p>
        <div className="flex gap-2">
          <Link
            to={`/watch/${movie.id}`}
            className="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <Play size={16} className="animate-pulse-slow" /> Play
          </Link>
          <button
            className="flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary-hover"
          >
            <Clock size={16} /> Watch Later
          </button>
        </div>
      </div>
    </div>
  );
}