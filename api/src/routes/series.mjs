import express from 'express';

import { getAllSeries, getSeries } from '../controllers/series.mjs';

const router = express.Router();
router.get('/', getAllSeries);
router.get('/:id', getSeries);

export default router;