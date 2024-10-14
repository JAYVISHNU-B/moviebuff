export const searchMovies = async (query, type) => {
    const typeParam = type ? `&type=${type}` : ''; // Add the type parameter if it's selected
    const response = await fetch(`https://www.omdbapi.com/?s=${query}${typeParam}&apikey=9dee335a`);
    const data = await response.json();
    return data;
  };
  