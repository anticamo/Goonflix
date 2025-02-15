import React, { useEffect, useState } from 'react';
import { Movie } from '../types';
import { fetchTMDB } from '../utils/tmdb';
import { FeaturedSlider } from '../components/FeaturedSlider';
import { MediaSlider } from '../components/MediaSlider';

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
];

export function Movies() {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Record<number, Movie[]>>({});
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularData, trendingData, topRatedData, newData] = await Promise.all([
          fetchTMDB('movie/popular'),
          fetchTMDB('trending/movie/week'),
          fetchTMDB('movie/top_rated'),
          fetchTMDB('movie/now_playing')
        ]);

        if (popularData?.results) setFeaturedMovies(popularData.results);
        if (trendingData?.results) setTrendingMovies(trendingData.results);
        if (topRatedData?.results) setTopRatedMovies(topRatedData.results);
        if (newData?.results) setNewMovies(newData.results);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!genreMovies[selectedGenre]) {
        const data = await fetchTMDB('discover/movie', {
          with_genres: selectedGenre.toString()
        });
        if (data?.results) {
          setGenreMovies(prev => ({
            ...prev,
            [selectedGenre]: data.results
          }));
        }
      }
    };

    fetchGenreMovies();
  }, [selectedGenre]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-text-secondary">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <FeaturedSlider movies={featuredMovies} />
      
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
          {genreMovies[selectedGenre] && (
            <MediaSlider
              title=""
              items={genreMovies[selectedGenre]}
            />
          )}
        </div>

        <MediaSlider title="Trending Now" items={trendingMovies} />
        <MediaSlider title="Top Rated" items={topRatedMovies} />
        <MediaSlider title="New Releases" items={newMovies} />
      </div>
    </div>
  );
}