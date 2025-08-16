import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError("Failed to fetch cast.");
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={css.list}>
      {cast.map((member) => (
        <li key={member.cast_id}>
          {member.name} as {member.character}
        </li>
      ))}
    </ul>
  );
}
