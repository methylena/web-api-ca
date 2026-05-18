import fetch from 'node-fetch';

const BASE = 'https://api.themoviedb.org/3';

const getApiKey = () => {
  const key = process.env.TMDB_KEY;
  if (!key) {
    throw new Error('TMDB_KEY is missing. Add it to movies-api/.env');
  }
  return key;
};

const tmdbFetch = (path, query = 'language=en-US') => {
  const apiKey = getApiKey();
  return fetch(`${BASE}${path}?api_key=${apiKey}&${query}`).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'TMDB request failed');
    }
    return data;
  });
};

export const getMovies = () => {
  const apiKey = getApiKey();
  return fetch(
    `${BASE}/discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'TMDB request failed');
    }
    return data;
  });
};

export const getUpcomingMovies = () => tmdbFetch('/movie/upcoming');

export const getGenres = () => tmdbFetch('/genre/movie/list');

export const getTopRatedMovies = () => tmdbFetch('/movie/top_rated');

export const getPopularPeople = () => tmdbFetch('/person/popular');

export const getTopRatedTVShows = () => tmdbFetch('/tv/top_rated');

export const getMovie = (id) => tmdbFetch(`/movie/${id}`);

export const getCast = (id) => tmdbFetch(`/movie/${id}/credits`);

export const getMovieImages = (id) => {
  const apiKey = getApiKey();
  return fetch(`${BASE}/movie/${id}/images?api_key=${apiKey}`).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'TMDB request failed');
    }
    return data;
  });
};

export const getMovieReviews = (id) => tmdbFetch(`/movie/${id}/reviews`);

export const getTVShow = (id) => tmdbFetch(`/tv/${id}`);

export const getTVCredits = (id) => tmdbFetch(`/tv/${id}/credits`);

export const getTVShowImages = (id) => {
  const apiKey = getApiKey();
  return fetch(`${BASE}/tv/${id}/images?api_key=${apiKey}`).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || 'TMDB request failed');
    }
    return data;
  });
};

export const getPerson = (id) => tmdbFetch(`/person/${id}`);

export const getPersonCombinedCredits = (id) =>
  tmdbFetch(`/person/${id}/combined_credits`);
