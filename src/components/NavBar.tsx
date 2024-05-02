import React from "react";
import { IMovies } from "../Interfaces/interfaces";

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
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      autoFocus
      onChange={(e) => setQuery(e.target.value)}
      // onChange={(e) => console.log(e.target.value)}
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
