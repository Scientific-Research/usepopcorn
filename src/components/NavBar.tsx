import { useState } from "react";
import { ITempMovie } from "../Interfaces/interfaces";

export const NavBar: React.FC<{ movies: ITempMovie[] }> = ({ movies }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
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

export const NumResults: React.FC<{ movies: ITempMovie[] }> = ({ movies }) => {
  // const movies = tempMovieData;

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
