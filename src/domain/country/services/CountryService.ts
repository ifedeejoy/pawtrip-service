import { Country } from '../models/Country';

export const getAllCountries = async () => {
    return await Country.find();
}
