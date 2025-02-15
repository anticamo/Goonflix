import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Movie, Cast, Review, SourceConfig } from '../types';
import sourcesData from '../data/sources.json';
import { fetchTMDB } from '../utils/tmdb';
import { Clock, Star, Calendar, Globe } from 'lucide-react';
import { tmdbConfig } from '../config/tmdb';

export function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [currentSource, setCurrentSource] = useState<number>(0);
  const { sources } = sourcesData as SourceConfig;

  useEffect(() => {
    const fetchMovieData = async () => {
      if (id) {
        try {
          const [movieData, creditsData, reviewsData, recommendationsData] = await Promise.all([
            fetchTMDB(`movie/${id}`),
            fetchTMDB(`movie/${id}/credits`),
            fetchTMDB(`movie/${id}/reviews`),
            fetchTMDB(`movie/${id}/recommendations`)
          ]);

          if (movieData) setMovie(movieData);
          if (creditsData?.cast) setCast(creditsData.cast.slice(0, 10));
          if (reviewsData?.results) setReviews(reviewsData.results.slice(0, 5));
          if (recommendationsData?.results) setRecommendations(recommendationsData.results.slice(0, 10));
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-text-secondary">Loading movie...</p>
        </div>
      </div>
    );
  }

  const currentUrl = sources[currentSource].movies.replace('{id}', id || '');

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text">{movie.title}</h1>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
                <Clock size={16} /> Watch Later
              </button>
              <div className="flex gap-2">
                {sources.map((source, index) => (
                  <button
                    key={source.name}
                    onClick={() => setCurrentSource(index)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                      currentSource === index
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-text-secondary hover:bg-secondary-hover hover:text-text'
                    }`}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="animate-scale-in overflow-hidden rounded-xl bg-black">
          <iframe
            src={currentUrl}
            className="aspect-video w-full"
            allowFullScreen
            allow="fullscreen"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 space-y-6">
            <div className="animate-slide-up rounded-xl bg-secondary p-6">
              <h2 className="mb-4 text-xl font-bold text-text">Description</h2>
              <p className="text-text-secondary">{movie.overview}</p>
            </div>

            <div className="animate-slide-up rounded-xl bg-secondary p-6" style={{ animationDelay: '0.1s' }}>
              <h2 className="mb-4 text-xl font-bold text-text">Cast</h2>
              <div className="flex flex-wrap gap-4">
                {cast.map(member => (
                  <div key={member.id} className="flex items-center gap-3">
                    <img
                      src={`${tmdbConfig.image.url}/${tmdbConfig.image.cast}${member.profile_path}`}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-secondary"
                    />
                    <div>
                      <p className="font-medium text-text">{member.name}</p>
                      <p className="text-sm text-text-secondary">{member.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up rounded-xl bg-secondary p-6" style={{ animationDelay: '0.2s' }}>
              <h2 className="mb-4 text-xl font-bold text-text">Reviews</h2>
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-background/20 pb-4 last:border-0">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-medium text-text">{review.author}</p>
                      <p className="text-sm text-text-secondary">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-text-secondary">{review.content.slice(0, 300)}...</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up rounded-xl bg-secondary p-6" style={{ animationDelay: '0.3s' }}>
              <h2 className="mb-4 text-xl font-bold text-text">You May Also Like</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {recommendations.map(movie => (
                  <Link to={`/watch/${movie.id}`} key={movie.id} className="group relative overflow-hidden rounded-lg">
                    <img
                      src={`${tmdbConfig.image.url}/${tmdbConfig.image.poster}${movie.poster_path}`}
                      alt={movie.title}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background via-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm font-medium text-text">{movie.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-slide-up rounded-xl bg-secondary p-6" style={{ animationDelay: '0.4s' }}>
            <h2 className="mb-4 text-xl font-bold text-text">Movie Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Language</p>
                  <p className="text-text">{movie.original_language.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Rating</p>
                  <p className="text-text">{movie.vote_average.toFixed(1)} / 10</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">Released</p>
                  <p className="text-text">{new Date(movie.release_date).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm text-text-secondary">Genres</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}