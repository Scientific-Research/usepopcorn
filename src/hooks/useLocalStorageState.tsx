import { useEffect, useState } from "react";

// NOTE: creating a reusable custom hook to set and get the watched movie in local storage
export const useLocalStorageState = (initialState: [], key: string) => {
  // const [watched, setWatched] = useState<IMovieWatchedCombined[]>([]);
  // NOTE: the initial value here would be getting the item from local storage and display them in browser only for first time when the page reloads. => so, here is the best place to do that!
  // const [watched, setWatched] = useState(() => {
  const [value, setValue] = useState(() => {
    // const storedValue = localStorage.getItem("watched") as string;
    const storedValue = localStorage.getItem(key) as string;

    // NOTE: when there is not a watched movie in the array at the beginning, it would be null and we get an error, to avoid such error, we use ternary operator to assign an empty bracet[].
    // const parsedValue = storedValue ? JSON.parse(storedValue) : []; // to convert the storedValue as string to an object => we use JSON.parse() function.
    const parsedValue = storedValue ? JSON.parse(storedValue) : initialState; // to convert the storedValue as string to an object => we use JSON.parse() function.
    return parsedValue;

    // NOTE: JSON.stringify() => to convert an object to a JSON string
    // const a = JSON.stringify(storedValue);

    // NOTE: JSON.parse() => to convert a JOSN string to an object
    // const b = JSON.parse(storedValue);
  });

  // NOTE: second solution using useEffect to store the watched movies in local storage in the browser! the first method is above!
  useEffect(() => {
    localStorage.setItem(
      // "watched",
      key,
      // NOTE: JSON.stringify([...watched, newWatchedMovie]) => we don't need this here anymore, because we have the updated value for wateched movie as a state variable => watched and we just need to use that here!
      // JSON.stringify(watched)
      JSON.stringify(value)
    );
    // }, [watched]); // to run this useEffect, each time the watched state variable is updated!
  }, [value, key]); // to run this useEffect, each time the watched state variable is updated!
  return [value, setValue]; // NOTE: these are the same like watched and setWatched that we send them back to the App.tsx
};
