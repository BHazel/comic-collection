import express from 'express';

import { getAllSeries } from '../controllers/series.mjs';

const router = express.Router();
router.get('/', getAllSeries);

export default router;