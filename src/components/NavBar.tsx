import React, { useRef } from "react";
import { IMovies } from "../Interfaces/interfaces";
import { useKey } from "../hooks/useKey";

// export const NavBar: React.FC<{ movies: ITempMovie[] }> = ({ movies }) => {
export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="nav-bar">
      {/* NOTE: using component composition => moving these three subcomponents of NavBar to the App.tsx to get the prop directly from state variable there and not from NavBar anymore(removing prop drilling problem) therefore, we get and write the children as prop here instead! */}

      {/* <Logo />
      <Search />
      <NumResults movies={movies} /> */}
      {children}
    </nav>
  );
};

export const Search = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (f: string) => void;
}) => {
  // NOTE: using useRef and ref to get the focus in input filed whenever the page is reloading:
  const inputEl = useRef<HTMLInputElement | null>(null); // Specify the type as HTMLInputElement or null

  // NOTE: instead of using following useEffect for Enter key, i use the REUSABLE CUSTOM HOOK => from useKeys.tsx, Important note is: the action here is not only setQuery, rather, some statements which have to be adapted to the original Code!
  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    if (inputEl.current) {
      inputEl.current.focus();
      setQuery("");
    }
  });

  // NOTE: Instead of following useEffect for Enter key, i sue the above REUSABLE CUSTOM HOOK => from useKeys.tsx
  // useEffect(() => {
  //   const callback = (e: { code: string }) => {
  //     // NOTE: when cursor is in input field, and i press the Enter again, it will not delete the word in input filed, rather, the focus stays there. But when the focus is not in the input filed anymore and i press the Enter for second time, it will clear the word in the input field!
  //     if (e.code === "Enter") {
  //       if (document.activeElement === inputEl.current) return;
  //       // console.log(inputEl.current); // NOTE: this is the DOM element itself as follows:
  //       // <input class="search" type="text" placeholder="Search movies..." value="">
  //       if (inputEl.current) {
  //         // if (inputEl.current !== null) { OR
  //         inputEl.current.focus(); // when we press Enter for the first time, then makes the focus in the input field!
  //         setQuery(""); // the second enter will delete the input field!
  //       }
  //     }
  //   };
  //   document.addEventListener("keydown", callback);
  //   return () => document.addEventListener("keydown", callback);
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      // autoFocus // NOTE: we use refs in React to do the same job like autoFocus, that's why i commented this method here: => autoFocus - using Refs to get the focus is above!
      onChange={(e) => setQuery(e.target.value)}
      // onChange={(e) => console.log(e.target.value)}
      ref={inputEl}
    />
  );
};

export const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

// export const NumResults: React.FC<{ movies: ITempMovie[] }> = ({ movies }) => {
export const NumResults: React.FC<{ movies: IMovies[] }> = ({ movies }) => {
  // export const NumResults = ({ movies }: ITempMovie[]) => {
  // const movies = tempMovieData;

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
