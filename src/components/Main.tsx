import React, { useEffect, useState } from "react";
import {
  IMovies,
  IWatchedMovies,
  IMovie,
  IMovieWatchedCombined,
} from "../Interfaces/interfaces";
import { StarRating } from "./StarRating";

const defaultMovie: IMovieWatchedCombined = {
  Title: "",
  Year: "",
  Poster: "",
  Runtime: "",
  imdbRating: 0,
  Plot: "",
  Released: "",
  Actors: "",
  Director: "",
  Genre: "",
  imdbID: null,
  runtime: 0,
  userRating: 0,
};

// to show the LOADING word...
const Loader = () => {
  return <p className="loader">Loading...</p>;
};

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
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
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
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) => {
  return (
    <>
      {/* when i click on the name of a Movie, it shows me the ID of that Movie! */}
      {/* <li onClick={() => setSelectedId(movie.imdbID)}> */}

      {/* when i click on the name of the movie again, it closes the right window => the Movie ID will disappear OR when i click on the name of a Movie, it shows me the ID of that Movie! */}
      <li
        onClick={() =>
          setSelectedId(movie.imdbID === selectedId ? null : movie.imdbID)
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

const KEY = "27646d5b";

export const MovieDetails: React.FC<{
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  watched: IMovieWatchedCombined[];
  setWatched: (w: IMovieWatchedCombined[]) => void;
}> = ({ selectedId, setSelectedId, watched, setWatched }) => {
  const [movie, setMovie] = useState<IMovieWatchedCombined>(defaultMovie);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // NOTE: it shows us, whether our selected watched movie is already in the list of the watched movies or not? when yes, shows us True, otherwise, False
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  // console.log(isWatched);

  // NOTE: to find the rating for every movie!
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // console.log(title, year);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        // `http://www.omdbapi.com/?apikey=${KEY}&s=${query}` // s for search => query
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}` // i for getting ID
      );
      const data = await res.json();
      // console.log(data);
      setMovie(() => data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]); // it renders each time the component renders => using an empty dependency array

  // Note: we add here a useEffect => when i click on a movie name, the name of the movie will be appeared on the Browser tab too!

  useEffect(() => {
    // document.title = "TEST";
    document.title = movie.Title;
  }, [movie]); // only runs one time, when loading the page or when something changes inside useEffect, it will rerender, for example, when i change 'TEST' to 'TEST1' => it will render again(rerender). => at the end, movie as state variable is a dependency element in this array => when we click on a new film, movie will change and therefore, our title will be rerenderd and the title of the filem will change!

  // NOTE: when i click on the + Add to list button, it will add this watched movie as a new watched movie to the list of watched movies! => first of all, we have to make a copy of watched because state variable are immutable in React and then we add the new watched film => newWatchedMovie to it!
  const handleAdd = () => {
    const newWatchedMovie: IMovieWatchedCombined = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      Runtime: "",
      Plot: "",
      Released: "",
      Actors: "",
      Director: "",
      Genre: "",
      userRating,
    };
    setWatched([...watched, newWatchedMovie]);
    setSelectedId(""); // after clicking on the + Add to list, the window will be closed immediatley!
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            {/* when i click on the back arrow, it will back to the main menu on the right side! */}
            <button className="btn-back" onClick={() => setSelectedId("")}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie!`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    color="#fcc419"
                    size={24}
                    className={""}
                    messages={[]}
                    defaultRating={0}
                    onSetRating={setUserRating} // here we get the user rating and send it to the newWatchedMovie in handleAdd() function!
                  />

                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      // onClick={() => setWatched([...watched, movie])}
                      onClick={handleAdd}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated {watchedUserRating} <span>⭐</span> for this
                  movie!
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export const WatchedSummary: React.FC<{ watched: IMovieWatchedCombined[] }> = ({
  watched,
}) => {
  const average = (arr: number[]) =>
    arr.reduce(
      (acc, cur, i, arr) => Number((acc + cur / arr.length).toFixed(2)),
      0
    );

  const avgImdbRating = average(
    watched.map((movie) => Number(movie.imdbRating))
  );
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

export const WatchedMoviesList: React.FC<{
  watched: IMovieWatchedCombined[];
  setWatched: (w: IMovieWatchedCombined[]) => void;
}> = ({ watched, setWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          watched={watched}
          setWatched={setWatched}
        />
      ))}
    </ul>
  );
};

const WatchedMovie: React.FC<{
  movie: IWatchedMovies;
  watched: IMovieWatchedCombined[];
  setWatched: (w: IMovieWatchedCombined[]) => void;
}> = ({ movie, watched, setWatched }) => {
  // NOTE: a function to delete the watched movie info!
  const handleDeleteWatched = (id: string | null) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };
  return (
    <>
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

          {/* Delete trash icon in a red circle */}
          <button
            className="btn-delete"
            onClick={() => handleDeleteWatched(movie.imdbID)}
            aria-label="Delete"
            title="Delete" // this is tooltip, when i hover on the icon, it show the delete word!
          >
            <i className="fas fa-trash"></i>
            <span className="tooltip"></span>
          </button>
        </div>
      </li>
    </>
  );
};
