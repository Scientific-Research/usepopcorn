import { Logo, NavBar, NumResults, Search } from "./components/NavBar";
import {
  Box,
  Main,
  MovieList,
  WatchedMoviesList,
  WatchedSummary,
  MovieDetails,
} from "./components/Main";
import { useEffect, useState } from "react";
import {
  IMovie,
  IMovieWatchedCombined,
  IWatchedMovies,
} from "./Interfaces/interfaces";

const KEY = "27646d5b";

export default function App() {
  // const [query, setQuery] = useState("interstellar"); // we have to transfer query and setQuery to search function in NavBar.tsx
  const [query, setQuery] = useState(""); // we have to transfer query and setQuery to search function in NavBar.tsx

  // const [movies, setMovies] = useState(tempMovieData);
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(tempWatchedData);
  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState([]);

  // const [watched, setWatched] = useState<IMovieWatchedCombined[]>([]);
  // NOTE: the initial value here would be getting the item from local storage and display them in browser only for first time when the page reloads. => so, here is the best place to do that!
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched") as string;
    return JSON.parse(storedValue); // to convert the storedValue as string to an object => we use JSON.parse() function.
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("");

  // const tempQuery = "interstellar";
  // const query = "interstellar";
  // const query = "lsidhfkjsaf";

  /*
  useEffect(() => {
    console.log(
      "After initial render - render only one time after refresh the page or loading the page for first time!- or when the function inside the useEffect - what we write here - changes => it will render(run again)!"
    );
  }, []);
  
  useEffect(() => {
    console.log(
      "After every render, it doesn't matter whether refresh or loading the page or changing a state variable or something else - because it doesn't have any dependency bracket!"
    );
  });
  
  useEffect(() => {
    console.log(
      "D => when query state variable changes and only one time after refresh the page or loading the page for first time!"
    );
  }, [query]);
  
  console.log("During render - render always");
  */

  const getMovie = async () => {
    const controller = new AbortController();
    // NOTE: when there is no internet connection => we will get an error in catch section!
    try {
      setIsLoading(true);
      setError("");

      // NOTE: when we don't type anything in input field => query.length === 0 => I don't want to see the error => Movie not found!, that's why we set movies and error as default and at the end, do the return => it will not continue to the fetch and go back to the function!
      // if (query.length === 0) {
      // OR
      // if (query.length < 3) {
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      const res = await fetch(
        // `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        { signal: controller.signal }
      );

      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      // console.log(selectedId);
      // console.log(data);
      // console.log(data.Search);
      // NOTE: All these three below commands work:
      if (data.Response === "False") throw new Error("Movie not found!");
      // if (!data.response) throw new Error("Movie not found!");
      // if (data.Search === undefined) throw new Error("Movie not found!");

      setMovies(() => data.Search);
      setError("");
      // console.log(movies);
      // OR:
      // const result = data.Search;
      // setMovies(() => result);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.log(error.message);
        setError(error.message); // we don't get the Abort Error error messages!
      }

      // finally section will always be executed! It doesn't matter, whether we are finally in try or catch section. In this case, we will not see the LOADING... message in parallel, when we see the Failed to fetch message on the web!
    } finally {
      setIsLoading(false);
    }

    // NOTE: CLEANING happens on Unmount Effect => abortion(cancelling) the current HTTP fetch requests untill finishing the fetch requests and only keep the last one which is applicable!
    return () => {
      controller.abort();
    };
  };

  // NOTE: dependency array: empty [] means => useEffect only runs on mount! => useEffect only runs when App component runs for very first time!
  useEffect(() => {
    setSelectedId(""); // to close the current movie window before search a new movie in search field!
    getMovie();
  }, [query]); // the getMovie() function will be rendered whenever query value changes => when we type something in input field!

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
        <Search query={query} setQuery={setQuery} />
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
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          )}
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
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              watched={watched}
              setWatched={setWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} setWatched={setWatched} />
            </>
          )}
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
