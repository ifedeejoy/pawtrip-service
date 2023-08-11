import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    flag_image_url: {
        type: String,
        required: true
    }
});

export const Country = mongoose.model('Country', CountrySchema);
