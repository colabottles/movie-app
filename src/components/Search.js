import React from "react";
import "./Search.css";

function Search({ searchInput, search }) {
    return (
        <form className="search-bar" role="search">
          <label htmlFor="site-search">Search the site for a movie:</label>
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

export default Search;