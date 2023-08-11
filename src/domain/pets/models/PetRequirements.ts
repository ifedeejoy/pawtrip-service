import mongoose, { Schema, Document } from 'mongoose';

interface IPetRequirement extends Document {
    countryCode: string;
    quarantineDays: number;
    petMicrochip: string;
    microchipRequirement: string,
    tattooAccepted: boolean,
    rabiesMinDays: number,
    rabiesMaxMonths: number,
    rabiesTiterTest: boolean,
    ticksAndTapewormTreatment: boolean,
    healthCertificate: boolean,
    importPermit: boolean,
    USDAUrl: string,
    USDAVetSignature: boolean,
    USDAAccreditedVetSignature: string,

    // Use species-specific fields
    species_requirements: {
        [species: string]: {
            shared: {
                vaccinations: string[];
            },
            breeds?: {
                [breed: string]: {
                    vaccinations: string[];
                }
            }
        }
    };
}

const PetRequirementSchema: Schema = new Schema({
    countryCode: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    quarantineDays: Number,
    petMicrochip: String,
    microchipRequirement: String,
    tattooAccepted: Boolean,
    rabiesMinDays: Number,
    rabiesMaxMonths: Number,
    rabiesTiterTest: Boolean,
    ticksAndTapewormTreatment: Boolean,
    healthCertificate: Boolean,
    importPermit: Boolean,
    USDAUrl: String,
    USDAVetSignature: Boolean,
    USDAAccreditedVetSignature: String,

    species_requirements: {
        type: Object,
        required: true,
        default: {}
    }
});

export const PetRequirement = mongoose.model<IPetRequirement>('PetRequirement', PetRequirementSchema);
