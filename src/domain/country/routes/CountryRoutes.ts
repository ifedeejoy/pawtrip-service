import express from 'express';
import { listCountries } from '../controllers/CountryController';

const router = express.Router();

router.get('/countries', listCountries);

export default router;
