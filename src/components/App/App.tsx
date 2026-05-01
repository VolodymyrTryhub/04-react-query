import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";

function App() {
  const [query, setQuery] = useState("");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log(movie);
  };

  useEffect(() => {
    if (!isLoading && query && data.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isLoading, query]);

  return (
    <div>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data.length > 0 && (
        <MovieGrid movies={data} onSelect={handleSelectMovie} />
      )}
    </div>
  );
}

export default App;
