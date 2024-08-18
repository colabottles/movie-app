import React from "react";
import "./Search.css";

function Search({ searchInput, search }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted without reloading page");
    search(e);
  }
  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="site-search">Search the site for a movie:</label>
      <input
        type="search"
        className="search"
        id="site-search"
        name="site-search"
        onChange={searchInput}
        autoComplete="off"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
