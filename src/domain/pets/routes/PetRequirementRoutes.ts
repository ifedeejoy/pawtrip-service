import express from 'express';
import { getRequirement, getRequirementBySpeciesAndBreed } from '../controller/PetRequirementController';

const router = express.Router();

router.get('/requirements/:countryCode', getRequirement);
router.get('/requirement/:countryCode/:species/:breed?', getRequirementBySpeciesAndBreed);


export default router;
