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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const KEY = "27646d5b";

export default function App() {
  // const [query, setQuery] = useState("interstellar"); // we have to transfer query and setQuery to search function in NavBar.tsx
  const [query, setQuery] = useState(""); // we have to transfer query and setQuery to search function in NavBar.tsx
  const [selectedId, setSelectedId] = useState<string | null>("");

  // NOTE: calling the useMovies.tsx as CUSTOM HOOK with two inputs and getting three outputs: in fact, useMovies(query, setSelectedId) send us back an object containing three arguments which we extract them using deconstructuring!
  const { movies, isLoading, error } = useMovies(query, setSelectedId);

  // NOTE: calling this CUSTOM HOOK like a useState() for watched and setWatched: empty array here is initialstate and I will replace initialstate instead of [] in useLocalStorageState custom hook. Key is "watched".
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState([]);

  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);
  // const [watched, setWatched] = useState([]);

  // // const [watched, setWatched] = useState<IMovieWatchedCombined[]>([]);
  // // NOTE: the initial value here would be getting the item from local storage and display them in browser only for first time when the page reloads. => so, here is the best place to do that!
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem("watched") as string;

  //   // NOTE: when there is not a watched movie in the arrayat the beginning, it would be null and we get an error, to avoid such error, we use ternary operator to assign an empty bracet[].
  //   const parsedValue = storedValue ? JSON.parse(storedValue) : []; // to convert the storedValue as string to an object => we use JSON.parse() function.
  //   return parsedValue;

  //   // NOTE: JSON.stringify() => to convert an object to a JSON string
  //   // const a = JSON.stringify(storedValue);

  //   // NOTE: JSON.parse() => to convert a JOSN string to an object
  //   // const b = JSON.parse(storedValue);
  // });

  // NOTE: above, we added the movie to the list of movies and now, we want to store the watched movies to local storage which is setItem(key,value) in Web browsers and only available for current URL => http://localhost:5173/ and not for other one:
  // localStorage.setItem(
  //   "watched",
  //   JSON.stringify([...watched, newWatchedMovie]) // NOTE: both the key and value should be string, that's why i used JSON.stringify() to convert the array of objects: IMovieWatchedCombined to string and now both sides are string and can be stored in local storage in the Browsers!
  // NOTE: this was the first solution to write the local storage code here, the second solution is that to write the code for local storage in a useEffect() below: that's why i comment it out here. Write local storage code in a useEffect is better, because it would be reusable!
  //);

  // // NOTE: second solution using useEffect to store the watched movies in local storage in the browser! the first method is above!
  // useEffect(() => {
  //   localStorage.setItem(
  //     "watched",
  //     // NOTE: JSON.stringify([...watched, newWatchedMovie]) => we don't need this here anymore, because we have the updated value for wateched movie as a state variable => watched and we just need to use that here!
  //     JSON.stringify(watched)
  //   );
  // }, [watched]); // to run this useEffect, each time the watched state variable is updated!

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

  // NOTE: the useEffect and its function was here, and i moved it to a separate custom hook called useMovies.tsx

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
