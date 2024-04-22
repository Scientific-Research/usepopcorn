import { useState } from "react";
import { tempMovieData } from "../App";

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
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

export const NumResults = () => {
  const movies = tempMovieData;

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
