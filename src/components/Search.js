import React from 'react';

// Search component — kept as a form so Enter key works natively.
// Added onSubmit handler to prevent page reload (was already there, kept it).
function Search({ searchInput, search }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    search(e);
  };

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