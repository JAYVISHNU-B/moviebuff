import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { searchMovies } from '../services/movieService';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [mediaType, setMediaType] = useState(''); // State to store selected type (movie, series, or episode)

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    const results = await searchMovies(query, mediaType); // Pass the mediaType as well
    setMovies(results.Search || []);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
          placeholder="Search for movies, series, or episodes..."
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="media-type-dropdown"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
