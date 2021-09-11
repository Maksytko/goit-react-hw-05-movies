import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { fetchCast } from "../../services/films-api";

function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    fetchCast(movieId).then((data) => setCast(data.cast));
  }, []);

  return (
    <>
      {cast && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt=""
                width="100px"
              />
              <p>{actor.original_name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: propTypes.string,
};

export default Cast;
