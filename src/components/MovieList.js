import React, { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { useQuery } from "react-query";
import axios from "axios";

const GET_MOVIES = gql`
  query Movie {
  movies {
    nodes {
      id,
      title,
      posterUrl,
      rating,
      genres {
        id,
        title
      }
      summary
      mainActors
      duration
      directors
    }
  }
}
`;

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

    const { data, isLoading, error } = useQuery("launches", async () => {
        const response = await axios({
            url: endpoint,
            method: "GET",
            data: {
                query: GET_MOVIES
            }
        });
        return response.data.data;
      });
    
      if (isLoading) return "Loading...";
      if (error) return <pre>{error.message}</pre>;

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
