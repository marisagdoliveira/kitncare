import mongoose from 'mongoose';

const { Schema } = mongoose;

const HealthStateSchema = new Schema({
    healthy: {
        type: Boolean,
        required: true,
    },
    allergies: {
        type: Boolean,
        required: true,
    },
    vaccinated: {
        type: Boolean,
        required: true,
    }
}, { _id: false });

const AdoptedCatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    castrated: {
        type: Boolean,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    healthState: HealthStateSchema,
    consumption: {
        foodType: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        }
    },
}, { timestamps: true, collection: 'adoptedcats' });

const AdoptedCat = mongoose.models.AdoptedCat || mongoose.model('AdoptedCat', AdoptedCatSchema);

export default AdoptedCat;
