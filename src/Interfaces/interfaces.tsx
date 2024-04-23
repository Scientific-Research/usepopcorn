export interface ITempMovie {
  children: React.ReactNode;
}

export interface IMovies {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface ITempWatchedData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}
