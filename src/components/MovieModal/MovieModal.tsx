import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import type { MouseEvent } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const modalRoot = document.getElementById("modal-root")!;

if (!modalRoot) {
  throw new Error("Modal root not found");
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          className={styles.image}
          src={
            movie.backdrop_path
              ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
              : "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={`Backdrop of ${movie.title}`}
        />

        <div className={styles.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview || "No description available."}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date || "N/A"}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default MovieModal;
