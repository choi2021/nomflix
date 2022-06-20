const BASE_MOVIE_URL = 'https://api.themoviedb.org/3/movie';
const BASE_TV_URL = 'https://api.themoviedb.org/3/tv';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchNowPlayingMovies() {
  return fetch(
    `${BASE_MOVIE_URL}/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((response) => response.json());
}

export async function fetchTopRatedMovies() {
  return fetch(
    `${BASE_MOVIE_URL}/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchUpcomingMovies() {
  return fetch(
    `${BASE_MOVIE_URL}/upcoming?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchLatestShows() {
  return fetch(
    `${BASE_TV_URL}/latest?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchUpcomingAiringTodayShows() {
  return fetch(
    `${BASE_TV_URL}/airing_today?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchPopularShows() {
  return fetch(
    `${BASE_TV_URL}/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchTopRatedShows() {
  return fetch(
    `${BASE_TV_URL}/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&page=1region=KR`
  ).then((response) => response.json());
}

export async function fetchDetail(contentId: string, kind: string) {
  return fetch(
    `${BASE_URL}/${kind}/${contentId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export async function fetchSearchMovies(query: string) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&query=${query}`
  ).then((response) => response.json());
}

export async function fetchSearchTV(query: string) {
  return fetch(
    `${BASE_URL}/search/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KR&query=${query}`
  ).then((response) => response.json());
}
