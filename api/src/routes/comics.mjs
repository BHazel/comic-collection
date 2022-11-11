import express from 'express';

import { getComic, getComics, getSequelReading, getSequelSeries } from '../controllers/comics.mjs';

const router = express.Router();
router.get('/', getComics);
router.get('/:id', getComic);
router.get('/:id/sequel-reading', getSequelReading);
router.get('/:id/sequel-series', getSequelSeries);

export default router;