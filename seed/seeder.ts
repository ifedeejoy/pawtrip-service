import dotenv from "dotenv";
dotenv.config({});

import mongoose from 'mongoose';
import { Country } from '../src/domain/country/models/Country';
import { PetRequirement } from '../src/domain/pets/models/PetRequirements';

// Database connection
mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// Seeder data
const countries = [
    {
        name: "French Polynesia",
        code: "PF",
        flag_image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Flag_of_French_Polynesia.svg/1200px-Flag_of_French_Polynesia.svg.png"
    },
    {
        name: "Panama",
        code: "PA",
        flag_image_url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg"
    },
];

const petRequirements = [
    {
        quarantineDays: 0,
        petMicrochip: true,
        microchipRequirement: "15 digit ISO 11784/11785",
        tattooAccepted: false,
        rabiesMinDays: 30,
        rabiesMaxMonths: 6,
        rabiesTiterTest: true,
        ticksAndTapewormTreatment: false,
        healthCertificate: false,
        importPermit: true,
        USDACertificate: "checked",
        USDAUrl: "https://www.aphis.usda.gov/aphis/pet-travel/by-country/pettravel-french-polynesia",
        USDAAccreditedVetSignature: "Electronic Signature Accepted",
        USDAAPHISSignature: "Digital Endorsement Not Accepted",
        species_requirements: {
            dog: {
                shared: {
                    vaccinations: ["Parvovirus", "Distemper", "Hepatitis", "Leptospirosis"]
                },
                breeds: {
                    husky: {
                        vaccinations: ["Rabies"]  // Rabies only for Husky in this example
                    }
                }
            },
            cat: {
                shared: {
                    vaccinations: ["Feline Panleukopenia", "Calicivirus", "Feline Viral Rhinotracheitis"]
                }
            }
        }
    },
    {
        quarantineDays: 0,
        petMicrochip: true,
        microchipRequirement: "15 digit ISO 11784/11785",
        tattooAccepted: false,
        dogVaccinations: ["Rabies", "Parvovirus", "Distemper", "Hepatitis", "Leptospirosis"],
        rabiesMinDays: 30,
        rabiesMaxMonths: 6,
        catVaccinations: ["Rabies", "Feline Panleukopenia", "Calicivirus", "Feline Viral Rhinotracheitis"],
        rabiesTiterTest: true,
        ticksAndTapewormTreatment: false,
        healthCertificate: false,
        importPermit: true,
        USDACertificate: "checked",
        USDAUrl: "https://www.aphis.usda.gov/aphis/pet-travel/by-country/pettravel-panama",
        USDAAccreditedVetSignature: "Electronic Signature Accepted",
        USDAAPHISSignature: "Digital Endorsement Not Accepted",
        species_requirements: {
            dog: {
                shared: {
                    vaccinations: ["Parvovirus", "Distemper", "Hepatitis", "Leptospirosis"]
                },
                breeds: {
                    husky: {
                        vaccinations: ["Rabies"]  // Rabies only for Husky in this example
                    }
                }
            },
            cat: {
                shared: {
                    vaccinations: ["Feline Panleukopenia", "Calicivirus", "Feline Viral Rhinotracheitis"]
                }
            }
        }
    },
];

// Seed function
const seedDatabase = async () => {
    try {
        // First, clear out all existing data to avoid duplication
        await Country.deleteMany({});
        await PetRequirement.deleteMany({});

        // Insert countries and capture the resulting documents
        const insertedCountries = await Country.insertMany(countries);

        // Associate the country ObjectIds with the pet requirements
        const petRequirementsWithCountryCode = petRequirements.map((requirement, index) => ({
            ...requirement,
            countryCode: insertedCountries[index]._id
        }));


        await PetRequirement.insertMany(petRequirementsWithCountryCode);

        console.log('Database seeding complete!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Call the function
seedDatabase();
