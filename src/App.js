import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import logo from './film-reel.svg';
import './App.css';
import Search from './components/Search';
import Details from './components/Details';
import Pagination from './components/Pagination';

// Move the token to .env as REACT_APP_API_TOKEN before going to production
const API_URL = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVuSnd0MCIsIm5hbWUiOiJPcGVuSldUWzBdIn0.49JQF4ICJeqxpiIZ9x748VVOHj6FElyRm1tNpFGqaUY`,
  },
});

// Genre list extracted from JSX — no more 19 hand-typed option elements
const GENRES = [
  'action', 'adventure', 'animation', 'biography', 'comedy',
  'crime', 'documentary', 'drama', 'family', 'history',
  'horror', 'musical', 'mystery', 'romance', 'sci-fi',
  'short', 'thriller', 'war', 'western',
];

function App() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [results, setResults] = useState([]);
  // null = nothing selected; avoids the old `{}` empty-object checks
  const [selected, setSelected] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchResultCount, setSearchResultCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // One fetch function reused by initial load, search, and pagination
  const fetchMovies = useCallback(async ({ page = 1, search = '', genre = '' } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ page });
      if (search) params.set('search', search);
      if (genre) params.set('genre', genre);

      const { data } = await axiosInstance.get(`${API_URL}?${params}`);

      setResults(data.data);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalPages * 25);
      // Only show a filtered count when a search or genre is active
      setSearchResultCount(search || genre ? data.data.length : null);
    } catch {
      setError('Could not load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = () => {
    fetchMovies({ search: query, genre: selectedGenre });
  };

  const handlePagination = (pageNumber) => {
    fetchMovies({ page: pageNumber, search: query, genre: selectedGenre });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch full detail for a single movie by id
  const openDetail = async (id) => {
    try {
      const { data } = await axiosInstance.get(`${API_URL}/${id}`);
      setSelected(data);
    } catch {
      // Non-fatal — detail panel just won't open
    }
  };

  // Prop was closeDetail in App but closeDetails (with trailing s) in Details.js
  // now consistently closeDetail everywhere
  const closeDetail = () => setSelected(null);

  return (
    <div className="App">
      <header className="App-header">
        {/* aria-label removed — it duplicated alt and caused double-announcement */}
        <img src={logo} className="App-logo" alt="Movie App logo" />
      </header>

      <main>
        <h1>
          <a href="/">FindFlicks</a>
        </h1>

        <p className="Intro">
          Search thousands of films by title or filter by genre. Select a movie to see its release date, rating, and summary.
        </p>

        {/* Search and genre filter */}
        <section className="searchBar" aria-label="Search and filter">
          <Search
            searchInput={(e) => setQuery(e.target.value)}
            search={handleSearch}
          />

          <label htmlFor="genre-select">
            Filter by genre:&nbsp;
            {/* autoComplete not autocomplete — JSX props are camelCase */}
            <select
              id="genre-select"
              name="genre"
              autoComplete="off"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {/* optgroup requires a label attribute — was missing before */}
              <optgroup label="Genres">
                <option value="">-- Select a genre --</option>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
        </section>

        {/* Result count — aria-live announces changes to screen readers */}
        <section aria-label="Result count" aria-live="polite">
          {searchResultCount !== null ? (
            <p className="result-count">
              Showing <strong>{searchResultCount}</strong> of <strong>{totalCount}</strong> movies
            </p>
          ) : (
            <p className="result-count">Total movies: <strong>{totalCount}</strong></p>
          )}
        </section>

        {/* Error state */}
        {error && (
          <p role="alert" className="error">{error}</p>
        )}

        {/* Loading state */}
        {loading && (
          <p aria-live="polite" className="loading">Loading movies&hellip;</p>
        )}

        {/* Movie grid — articles not <details> elements */}
        {!loading && !error && (
          <section className="container" aria-label="Movie results">
            {results.length === 0 ? (
              <p className="empty">No movies found. Try a different search or genre.</p>
            ) : (
              results.map((movie) => (
                // key uses movie.id not array index — avoids reconciliation issues
                <article key={movie.id} className="item">
                  <img
                    src={movie.posterUrl}
                    alt={`Poster for ${movie.title}`}
                  />
                  <p>{movie.title}</p>
                  <button
                    type="button"
                    className="view-btn"
                    onClick={() => openDetail(movie.id)}
                    aria-label={`View details for ${movie.title}`}
                  >
                    View details
                  </button>
                </article>
              ))
            )}
          </section>
        )}

        {/* Detail panel rendered once outside the loop, not per-card */}
        {selected && (
          <Details
            selected={selected}
            closeDetail={closeDetail}
          />
        )}

        <Pagination
          handlePagination={handlePagination}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}

export default App;