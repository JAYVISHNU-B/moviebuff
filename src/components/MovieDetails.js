import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie's imdbID from URL params
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=9dee335a`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error fetching movie details. Please try again later.</div>;
  }

  return (
    <div className="movie-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to Search
      </button>
      {movie && (
        <div className="movie-details">
          <div className="movie-poster">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="movie-info">
            <h1>{movie.Title} ({movie.Year})</h1>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
