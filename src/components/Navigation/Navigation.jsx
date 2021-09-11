import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.list}>
          <li className={style.item}>
            <NavLink
              to="/"
              exact
              className={style.link}
              activeClassName={style.active}
            >
              Home
            </NavLink>
          </li>
          <li className={style.item}>
            <NavLink
              to="/movies"
              className={style.link}
              activeClassName={style.active}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navigation };
