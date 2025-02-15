import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchTMDB } from '../utils/tmdb';
import { FeaturedSlider } from '../components/FeaturedSlider';
import { MediaSlider } from '../components/MediaSlider';

const GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
];

export function Shows() {
  const [featuredShows, setFeaturedShows] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<Movie[]>([]);
  const [newShows, setNewShows] = useState<Movie[]>([]);
  const [genreShows, setGenreShows] = useState<Record<number, Movie[]>>({});
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const [popularData, trendingData, topRatedData, newData] = await Promise.all([
          fetchTMDB('tv/popular'),
          fetchTMDB('trending/tv/week'),
          fetchTMDB('tv/top_rated'),
          fetchTMDB('tv/on_the_air')
        ]);

        if (popularData?.results) setFeaturedShows(popularData.results);
        if (trendingData?.results) setTrendingShows(trendingData.results);
        if (topRatedData?.results) setTopRatedShows(topRatedData.results);
        if (newData?.results) setNewShows(newData.results);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, []);

  useEffect(() => {
    const fetchGenreShows = async () => {
      if (!genreShows[selectedGenre]) {
        const data = await fetchTMDB('discover/tv', {
          with_genres: selectedGenre.toString()
        });
        if (data?.results) {
          setGenreShows(prev => ({
            ...prev,
            [selectedGenre]: data.results
          }));
        }
      }
    };

    fetchGenreShows();
  }, [selectedGenre]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-text-secondary">Loading shows...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <FeaturedSlider movies={featuredShows} />
      
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-text">Browse by Genre</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {GENRES.map(genre => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  selectedGenre === genre.id
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-text-secondary hover:bg-secondary-hover hover:text-text'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
          {genreShows[selectedGenre] && (
            <MediaSlider
              title=""
              items={genreShows[selectedGenre]}
            />
          )}
        </div>

        <MediaSlider title="Trending Now" items={trendingShows} />
        <MediaSlider title="Top Rated" items={topRatedShows} />
        <MediaSlider title="New Episodes" items={newShows} />
      </div>
    </div>
  );
}