import express from 'express';
import asyncHandler from 'express-async-handler';
import Favorite from './favoriteModel';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id });
  res.status(200).json(
    favorites.map((f) => ({ id: f.mediaId, mediaType: f.mediaType }))
  );
}));

router.post('/', asyncHandler(async (req, res) => {
  const { id, mediaType } = req.body;
  const existing = await Favorite.findOne({
    userId: req.user._id,
    mediaId: id,
    mediaType,
  });
  if (!existing) {
    await Favorite.create({
      userId: req.user._id,
      mediaId: id,
      mediaType,
    });
  }
  res.status(201).json({ id, mediaType });
}));

router.delete('/:mediaId', asyncHandler(async (req, res) => {
  const result = await Favorite.deleteOne({
    userId: req.user._id,
    mediaId: req.params.mediaId,
    mediaType: req.query.mediaType || 'movie',
  });
  if (result.deletedCount) {
    res.status(204).json();
  } else {
    res.status(404).json({ code: 404, msg: 'Favorite not found' });
  }
}));

export default router;
