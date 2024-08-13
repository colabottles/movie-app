import React, { useState } from 'react';

const MovieList = ({ movies }) => {
    const [sortedMovies, setSortedMovies] = useState(movies);
    const [selectedGenre, setSelectedGenre] = useState('');

    const genres = ['All', 'Action', 'Comedy', 'Drama', 'Fantasy', 'Horror'];

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);

        if (genre === 'All') {
            setSortedMovies(movies);
        } else {
            const filteredMovies = movies.filter((movie) =>
                movie.genre.includes(genre)
            );
            setSortedMovies(filteredMovies);
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="genre">Sort by Genre: </label>
                <select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) => handleGenreChange(e.target.value)}
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="movie-list">
                {sortedMovies.length ? (
                    sortedMovies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <h3>{movie.title}</h3>
                            <p>{movie.genre.join(', ')}</p>
                            {/* Include other movie details here */}
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
