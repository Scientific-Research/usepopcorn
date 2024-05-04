import { useEffect, useState } from "react";

const KEY = "27646d5b";

// NOTE: useMovies as a custom hook is indeed a function which accepts argument as input and it is not a component which accepts props as input!
export const useMovies = (
  query: string,
  // setSelectedId: (s: string) => void
  callback: (id: string) => void // NOTE: change the name to callback to make it as reusable by other components too!
) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
        `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
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
    // setSelectedId(""); // to close the current movie window before search a new movie in search field!
    callback?.(""); // NOTE: change the name to callback to make it as reusable by other components too! .? means OPTIONAL CHAINING, without this, we have to test it manually firstly, if it exists => if(callback) callback("")=> I will call it only when it exists => do the (""), otherwise, it doesn't exists, don't call it!
    // NOTE: how to test WITHOUT OPTIONAL CHAINING: => optional chaining does the same but in a much more convenient way:
    // if (callback) callback("");
    getMovie();
  }, [query]); // the getMovie() function will be rendered whenever query value changes => when we type something in input field!

  // NOTE: we return these three required parameters back to the App.tsx
  return { movies, isLoading, error };
};
