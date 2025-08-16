import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200"; // poster için

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className={css.poster}
              />
            ) : (
              <div className={css.noPoster}>No Image</div>
            )}
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

