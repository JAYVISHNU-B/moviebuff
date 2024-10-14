import React, { useState } from 'react';
import { searchMovies } from '../services/movieService';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    const results = await searchMovies(query);
    onSearchResults(results.Search || []);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
