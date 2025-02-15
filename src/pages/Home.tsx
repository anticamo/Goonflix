import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchTMDB } from '../utils/tmdb';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tmdbConfig } from '../config/tmdb';

export function Home() {
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // add later
    const fetchContinueWatching = async () => {
      try {
        const data = await fetchTMDB('movie/popular', { page: '1' });
        if (data?.results) {
          setContinueWatching(data.results.slice(0, 4));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchContinueWatching();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-text-secondary">Loading your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="bg-primary text-white py-2 text-center">
        <p>
          If you meant to go to Goon Games,{' '}
          <a
            href="https://rootraspberry.github.io"
            className="underline hover:text-primary-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-text">Continue Watching</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {continueWatching.map((movie) => (
            <div key={movie.id} className="group relative overflow-hidden rounded-xl">
              <img
                src={`${tmdbConfig.image.url}/${tmdbConfig.image.poster}${movie.poster_path}`}
                alt={movie.title}
                className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background via-background/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="self-end">
                  <div className="h-1 w-full rounded-full bg-primary">
                    <div className="h-full w-3/4 rounded-full bg-white" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-white">{movie.title}</h3>
                  <Link
                    to={`/watch/${movie.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-white transition-colors hover:bg-primary-hover"
                  >
                    <Play size={16} />
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}