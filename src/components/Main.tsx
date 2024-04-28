import React, { useState } from "react";
import { IMovies, IWatchedMovies } from "../Interfaces/interfaces";

// export const Main: React.FC<{
//   movies: IMovies[];
//   watched: IWatchedMovies[];
// }> = ({ movies, watched }) => {
export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main">
      {/* NOTE: using component composition => moving these three subcomponents of NavBar to the App.tsx to get the prop directly from state variable there and not from NavBar anymore(removing prop drilling problem), therefore, we get and write the children as prop here instead! */}

      {/* <ListBox movies={movies} />
      <WatchedBox watched={watched} /> */}
      {children}
    </main>
  );
};

// export const ListBox: React.FC<{ movies: IMovies[] }> = ({ movies }) => {
// export const ListBox = ({ children }: { children: React.ReactNode }) => {
//   const [isOpen1, setIsOpen1] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen1((open) => !open)}
//       >
//         {isOpen1 ? "–" : "+"}
//       </button>

//       {/* {isOpen1 && <MovieList movies={movies} />} */}
//       {isOpen1 && children}
//     </div>
//   );
// };

// NOTE: we change the ListBox to a reusable component called Box:
export const Box = ({ children }: { children: React.ReactNode }) => {
  // export const Box = ({ element }: { element: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {/* {isOpen1 && <MovieList movies={movies} />} */}
      {isOpen && children}
      {/* {isOpen && element} */}
    </div>
  );
};

// NOTE: we use the above reusable Box instead of below WatchedBox
// export const WatchedBox = ({ watched }: { watched: IWatchedMovies[] }) => {
//   // const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// };

// export const MovieList: React.FC<{ movies: IMovies[] }> = ({ movies }) => {
export const MovieList = ({
  movies,
  selectedId,
  setSelectedId,
}: {
  movies: IMovies[];
  selectedId: string;
  setSelectedId: (id: string) => void;
}) => {
  // const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
};

// export const Movie: React.FC<{ movie: IMovies }> = ({ movie }) => {
export const Movie = ({
  movie,
  selectedId,
  setSelectedId,
}: {
  movie: IMovies;
  selectedId: string;
  setSelectedId: (id: string) => void;
}) => {
  return (
    <>
      {/* when i click on the name of a Movie, it shows me the ID of that Movie! */}
      {/* <li onClick={() => setSelectedId(movie.imdbID)}> */}
      <li
        onClick={() =>
          setSelectedId((selectedId) =>
            movie.imdbID === selectedId ? null : movie.imdbID
          )
        }
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
};

export const MovieDetails: React.FC<{
  selectedId: string;
  setSelectedId: (id: string) => void;
}> = ({ selectedId, setSelectedId }) => {
  return (
    <>
      <div className="details">{selectedId}</div>
      {/* when i click on the back arrow, it will back to the main menu on the right side! */}
      <button className="btn-back" onClick={() => setSelectedId("")}>
        &larr;
      </button>
    </>
  );
};

export const WatchedSummary: React.FC<{ watched: IWatchedMovies[] }> = ({
  watched,
}) => {
  const average = (arr: number[]) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export const WatchedMoviesList: React.FC<{ watched: IWatchedMovies[] }> = ({
  watched,
}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

const WatchedMovie: React.FC<{ movie: IWatchedMovies }> = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};
