export interface IMovies {
  imdbID: string | null;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IWatchedMovies {
  imdbID: string | null;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface IMovie {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

export interface IMovieWatchedCombined {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  imdbID: string | null;
  runtime: number;
  userRating: number;
}
