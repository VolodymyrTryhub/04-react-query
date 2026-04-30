import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (newQuery: string) => {
    setMovies([]);
    setQuery(newQuery);
  };

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast.error("No movies found for your request.");
        }

        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
