import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import { fetchReviews } from "../../services/films-api";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews(movieId).then((data) => setReviews(data.results));
  }, []);

  return (
    <>
      {reviews.length > 0 ? (
        <>
          <ul>
            {reviews.map((review) => (
              <li key={review.author}>
                <p>Author: {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}

Reviews.propTypes = {
  movieId: propTypes.string,
};

export default Reviews;
