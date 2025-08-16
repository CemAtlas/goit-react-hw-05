import axios from "axios";

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2U2Yzg1MTQ3YWEyMzFmMmI5ODEzMDczMTJiN2Q0NyIsIm5iZiI6MTc1NTI5MzQ3Mi4zODksInN1YiI6IjY4OWZhNzIwODczZTg4OGExMmNkMDJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FV4jgFwRJomKblobQjeAgYydu21aOazq0MIL9fA-Hw0"; 
const BASE_URL = "https://api.themoviedb.org/3"

const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return response.data.results;
};
