import React from "react";
import "./Search.css";

function SearchByGenre({ searchInput, search }) {
  return (
    <form className="search-bar" role="search">
      <label htmlFor="site-search">Search the site by genre:</label>
      <input
        type="search"
        className="search"
        id="site-search"
        name="site-search"
        onChange={searchInput}
        onKeyDown={search}
        autoComplete="off"
      />

      <button type="search">Search</button>
    </form>
  );
}

export default SearchByGenre;