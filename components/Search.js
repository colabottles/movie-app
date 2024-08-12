import React from "react";
import "./Search.css";

function Search({ searchInput, search}) {
    return (
        <form className="search" role="search">
          <label for="site-search">Search the site for a movie:</label>
            <input 
                type="search"
                id="site-search"
                name="site-search"
                aria-label="Search through site content"
            />

          <button type="search">Search</button>
        </form>
    );
}

export default Search;