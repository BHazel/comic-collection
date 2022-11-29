import express from 'express';

import { getAllSeries, getComics, getSeries } from '../controllers/series';

const router = express.Router();
router.get('/', getAllSeries);
router.get('/:id', getSeries);
router.get('/:id/comics', getComics);

export default router;