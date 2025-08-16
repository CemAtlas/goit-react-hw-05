import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id}>
          <p><strong>{review.author}</strong></p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
