import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getTopRatedTVShows,
  getTVShow,
  getTVCredits,
  getTVShowImages,
} from '../tmdb-api';

const router = express.Router();

router.get('/top-rated', asyncHandler(async (req, res) => {
  res.status(200).json(await getTopRatedTVShows());
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  res.status(200).json(await getTVCredits(req.params.id));
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  res.status(200).json(await getTVShowImages(req.params.id));
}));

router.get('/:id', asyncHandler(async (req, res) => {
  res.status(200).json(await getTVShow(req.params.id));
}));

export default router;
