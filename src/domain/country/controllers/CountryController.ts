import { Request, Response } from 'express';
import { getAllCountries } from '../services/CountryService';

export const listCountries = async (req: Request, res: Response): Promise<void> => {
    try {
        const countries = await getAllCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve countries.' });
    }
}
