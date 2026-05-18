import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getMovies,
  getUpcomingMovies,
  getGenres,
  getTopRatedMovies,
  getPopularPeople,
  getMovie,
  getCast,
  getMovieImages,
  getMovieReviews,
} from '../tmdb-api';

const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovies());
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  res.status(200).json(await getUpcomingMovies());
}));

router.get('/genres', asyncHandler(async (req, res) => {
  res.status(200).json(await getGenres());
}));

router.get('/top-rated', asyncHandler(async (req, res) => {
  res.status(200).json(await getTopRatedMovies());
}));

router.get('/popular-people', asyncHandler(async (req, res) => {
  res.status(200).json(await getPopularPeople());
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  res.status(200).json(await getCast(req.params.id));
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieImages(req.params.id));
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovieReviews(req.params.id));
}));

router.get('/:id', asyncHandler(async (req, res) => {
  res.status(200).json(await getMovie(req.params.id));
}));

export default router;
