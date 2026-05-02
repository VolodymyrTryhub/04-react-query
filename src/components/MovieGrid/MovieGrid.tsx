import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) {
    return <p>No movies found.</p>;
  }

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image";

        return (
          <li key={movie.id}>
            <button className={styles.card} onClick={() => onSelect(movie)}>
              <img
                className={styles.image}
                src={imageUrl}
                alt={`Poster of ${movie.title}`}
                loading="lazy"
              />
              <h2 className={styles.title}>{movie.title}</h2>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieGrid;
