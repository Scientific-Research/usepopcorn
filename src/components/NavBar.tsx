import React, { useState } from "react";
import { IMovies } from "../Interfaces/interfaces";

// export const NavBar: React.FC<{ movies: ITempMovie[] }> = ({ movies }) => {
export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="nav-bar">
      {/* <Logo />
      <Search />
      <NumResults movies={movies} /> */}
      {children}
    </nav>
  );
};

export const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
