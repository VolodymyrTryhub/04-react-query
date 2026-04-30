import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(movie)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSelect(movie);
              }
            }}
          >
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={`Poster of ${movie.title}`}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
