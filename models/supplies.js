import mongoose from 'mongoose';

const SuppliesSchema = new mongoose.Schema({
    normalFood: { type: Number, required: true, default: 0 },
    specialFood: { type: Number, required: true, default: 0 },
    areia: { type: Number, required: true, default: 0 },
    medKit: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Supplies = mongoose.models.Supplies || mongoose.model('Supplies', SuppliesSchema);
export default Supplies;

