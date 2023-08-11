import { PetRequirement } from '../models/PetRequirements';
import { Country } from '../../country/models/Country';

export const getRequirementsByCountryId = async (countryCode: string) => {
    return await PetRequirement.findOne({ countryCode: countryCode }).populate('countryCode');
}

export const getRequirementsByCountrySpeciesAndBreed = async (countryCode: string, species: string, breed?: string) => {
    const country = await Country.findOne({ _id: countryCode });

    if (!country) return null;

    const requirements = await PetRequirement.findOne({ countryCode: country._id });
    if (!requirements) return null;

    // Extract species_requirements to avoid sending data for all species
    const { species_requirements, ...generalRequirements } = requirements.toObject();

    if (!species_requirements[species]) return null;

    const speciesData = species_requirements[species];

    let specificData;
    if (breed && speciesData.breeds && speciesData.breeds[breed]) {
        specificData = {
            ...speciesData.shared,
            ...speciesData.breeds[breed]
        };
    } else {
        specificData = speciesData.shared;
    }

    return {
        ...generalRequirements,
        countryCode: country,
        speciesData: specificData
    };
}

