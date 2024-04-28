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
