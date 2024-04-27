import { Logo, NavBar, NumResults, Search } from "./components/NavBar";
import {
  Box,
  Main,
  MovieList,
  WatchedMoviesList,
  WatchedSummary,
} from "./components/Main";
import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "27646d5b";

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(tempWatchedData);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const query = "interstellar";

  const getMovie = async () => {
    // NOTE: when there is no internet connection => we will get an error in catch section!
    try {
      setIsLoading(true);
      const res = await fetch(
        // `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
      );
      if (!res.ok) throw new Error("Something went wring with fetching movies");
      const data = await res.json();
      // console.log(data);
      setMovies(() => data.Search);
      setIsLoading(false);
      console.log(movies);
      // const result = data.Search;
      // setMovies(() => result);
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  };

  // NOTE: dependency array: empty [] means => useEffect only runs on mount! => useEffect only runs when App component runs for very first time!
  useEffect(() => {
    getMovie();
  }, []);

  // to show the LOADING word...
  const Loader = () => {
    return <p className="loader">Loading...</p>;
  };

  // to show error...
  const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <p className="error">
        <span>⛔</span>
        {message}
      </p>
    );
  };

  return (
    <>
      {/* NOTE: We have here component composition => composed NavBar with its components and in NavBar page, we write children instead of these subcomponents!

      // NOTE: Our NumResults doesn't get the movies prop from NavBar anymore, rather, it gets it directly from movies state variable above! that's why I removed the movies prop from NavBar below! */}

      {/* <NavBar movies={movies}> */}
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      {/* NOTE: the same process => component composition done below for Main as i explained it for NavBar above!
      and now, the ListBox and WatchedBox receive the props directly from state variables above and not from Main anymore, that's why i removed the props from Main below!
      In Main, we will have only children as prop and nothing more!*/}

      {/* <Main movies={movies} watched={watched} /> */}
      <Main>
        {/* <ListBox movies={movies}> */}
        {/* <ListBox> */}

        {/* NOTE: OR INSTEAD OF USING CHILDREN, WE CAN DECLARE IT AS EXPLICIT PROP: IN THIS CASE, OUR PROP CALLED element!
        // NOTE: the similar pattern is used by React Router!*/}
        {/* <Box element={<MovieList movies={movies} />} /> */}
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* NOTE: Using the reusable Box for ListBox => we bring this one part inside Box which is not available in Box and send to it the prop directly! */}
        {/* <Box>
          <MovieList movies={movies} />
        </Box> */}

        {/* </ListBox> */}
        {/* <WatchedBox watched={watched} /> */}

        {/* NOTE: THE SAME CONCEPT => SENDING element AS EXPLICIT PROP FOR THIS ONE INSTEAD OF USING CHILDREN:*/}
        {/* <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
        {/* NOTE: Using the reusable Box for WatchedBox => we bring these two parts inside Box which is not available in Box and send them the props directly!*/}
        {/* <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box> */}
      </Main>
    </>
  );
}
