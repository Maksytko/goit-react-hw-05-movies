import {
  useHistory,
  useParams,
  useLocation,
  useRouteMatch,
  Switch,
} from "react-router";
import { Link, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { fetchFilm } from "../../services/films-api";
// import { Reviews } from "../Reviews/Reviews";
// import { Cast } from "../Cast/Cast";
import style from "./MovieDetailsPage.module.css";

const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));
const Cast = lazy(() => import("../Cast/Cast.jsx"));

function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetchFilm(movieId).then((data) => setFilm(data));
  }, []);

  function handleButtonClick() {
    if (location?.state?.from) {
      history.push(location.state.from);
      return;
    }
    history.push("/movies");
  }

  return (
    <>
      {film && (
        <>
          <button
            type="button"
            onClick={handleButtonClick}
            className={style.button}
          >
            Go back
          </button>
          <h1>{film.original_title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt=""
          />
          <p>User Score: {Math.floor(film.popularity)}%</p>
          {film.overview && (
            <>
              <h2>Overview</h2>
              <p>{film.overview}</p>
            </>
          )}
          <h2>Genres</h2>
          <ul>
            {film.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <h2>Additional information</h2>
          <ul>
            <Link
              to={{
                pathname: `${url}/reviews`,
                state: { from: location.state.from },
              }}
              className={style.link}
            >
              Reviews
            </Link>
            <Link
              to={{
                pathname: `${url}/cast`,
                state: { from: location.state.from },
              }}
              className={style.link}
            >
              Cast
            </Link>
          </ul>
        </>
      )}
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path="/movies/:movieId/reviews">
            <Reviews movieId={movieId} />
          </Route>
          <Route path="/movies/:movieId/cast">
            <Cast movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default MovieDetailsPage;
