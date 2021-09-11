const API_KEY = "64e07c605fe460db631bf69bda24f425";
const API_URL = "https://api.themoviedb.org/3";

async function fetchResponse(url) {
  const response = await fetch(url);
  return response.json();
}

function fetchPopularFilms() {
  return fetchResponse(`${API_URL}/trending/movie/day?api_key=${API_KEY}`);
}

function fetchFilmByName(name) {
  return fetchResponse(
    `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`
  );
}

function fetchFilm(movieId) {
  return fetchResponse(`
${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

function fetchReviews(movieId) {
  return fetchResponse(
    `${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}

function fetchCast(movieId) {
  return fetchResponse(
    `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export {
  fetchFilmByName,
  fetchFilm,
  fetchPopularFilms,
  fetchReviews,
  fetchCast,
};
