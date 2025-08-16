import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backLink}>
        &larr; Go back
      </Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLinkRef.current }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkRef.current }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
