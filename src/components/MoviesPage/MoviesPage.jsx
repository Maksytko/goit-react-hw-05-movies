import { useEffect, useState } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { fetchFilmByName } from "../../services/films-api";
import style from "./MoviesPage.module.css";

function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const query = new URLSearchParams(location.search).get("query") ?? "";

  const [films, setFilms] = useState(null);
  const [name, setName] = useState(query);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (name === "") {
      return;
    }

    fetchFilmByName(name)
      .then((data) => setFilms(data.results))
      .finally(setValue(""));
  }, [name]);

  function handleInputChange(event) {
    setValue(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    history.push({
      ...location,
      search: `query=${value}`,
    });

    setName(value);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Search</button>
        <input type="text" onChange={handleInputChange} value={value} />
      </form>
      {films && (
        <ul className={style.list}>
          {films.map((film) => {
            return (
              <li key={film.id} className={style.item}>
                <Link
                  to={{
                    pathname: `${url}/${film.id}`,
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
      )}
      {films?.length === 0 && <p>Nothing found</p>}
    </>
  );
}

export default MoviesPage;
