export interface IMovies {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IWatchedMovies {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
