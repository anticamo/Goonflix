export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface VideoSource {
  name: string;
  movies: string;
  shows: string;
}

export interface SourceConfig {
  sources: VideoSource[];
}