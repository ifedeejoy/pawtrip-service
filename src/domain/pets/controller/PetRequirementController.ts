import { Request, Response } from 'express';
import { getRequirementsByCountryId, getRequirementsByCountrySpeciesAndBreed } from '../services/PetRequirementService';

export const getRequirement = async (req: Request, res: Response): Promise<void> => {
    const { countryCode } = req.params;
    const requirement = await getRequirementsByCountryId(countryCode);
    res.json(requirement);
}

export const getRequirementBySpeciesAndBreed = async (req: Request, res: Response): Promise<void> => {
    const { countryCode, species, breed } = req.params;

    if (!countryCode || !species) {
        res.status(400).json({ error: 'Country code and species are required.' });
        return;
    }

    const requirement = await getRequirementsByCountrySpeciesAndBreed(countryCode, species, breed);

    if (!requirement) {
        res.status(404).json({ error: 'No requirements found for the provided criteria.' });
        return;
    }

    res.json(requirement);
}
