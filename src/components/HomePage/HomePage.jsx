import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchPopularFilms } from "../../services/films-api";
import style from "./HomePage.module.css";

function HomePage() {
  const [films, setFilms] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchPopularFilms().then((data) => setFilms(data.results));
  }, []);

  return (
    <ul className={style.list}>
      {films &&
        films.map((film) => {
          return (
            <li key={film.id} className={style.item}>
              <Link
                to={{
                  pathname: `/movies/${film.id}`,
                  state: { from: location },
                }}
                className={style.link}
              >
                {film.original_title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

export default HomePage;
