import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Navigation } from "./components/Navigation/Navigation";
// import { HomePage } from "./components/HomePage/HomePage";
// import { MoviesPage } from "./components/MoviesPage/MoviesPage";
import { Section } from "./components/Section/Section";
// import { MovieDetailsPage } from "./components/MovieDetailsPage/MovieDetailsPage";

const HomePage = lazy(() => import("./components/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage.jsx")
);

function App() {
  return (
    <div className="App">
      <Navigation />
      <Section>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/movies" exact>
              <MoviesPage />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>
            <Route>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Section>
    </div>
  );
}

export default App;
