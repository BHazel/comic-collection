import express, { Router } from 'express';

import { getComic, getComics, getSequelReading, getSequelSeries } from '../controllers/comics';

const router: Router = express.Router();
router.get('/', getComics);
router.get('/:id', getComic);
router.get('/:id/sequel-reading', getSequelReading);
router.get('/:id/sequel-series', getSequelSeries);

export default router;