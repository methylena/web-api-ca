import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPerson, getPersonCombinedCredits } from '../tmdb-api';

const router = express.Router();

router.get('/:id/combined_credits', asyncHandler(async (req, res) => {
  res.status(200).json(await getPersonCombinedCredits(req.params.id));
}));

router.get('/:id', asyncHandler(async (req, res) => {
  res.status(200).json(await getPerson(req.params.id));
}));

export default router;
