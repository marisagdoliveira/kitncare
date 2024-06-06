import mongoose, { Schema, models } from "mongoose";

// Subdocument schema for health state
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

// Function to calculate the consumption based on health state, size, and age
const calculateConsumption = (healthState, size, age) => {
    let foodType = "Normal";
    let baseQuantity = 100; // Base quantity in grams
    const ageInYears = parseInt(age);

    if (healthState.healthy === false || healthState.allergies === true || healthState.vaccinated === false || ageInYears < 2) {
        foodType = "Special";
    }

    switch (size.toLowerCase()) {
        case "small":
            baseQuantity = 50;
            break;
        case "medium":
            baseQuantity = 75;
            break;
        case "large":
            baseQuantity = 100;
            break;
        default:
            baseQuantity = 100; // Default case if the size is not recognized
    }

    // Adjust quantity based on age
    if (ageInYears < 2) {
        baseQuantity -= 20;
    } else if (ageInYears >= 2 && ageInYears <= 10) {
        baseQuantity += 20;
    }

    return { foodType, quantity: `${baseQuantity}g/day` };
};

// Schema for cat
const CatSchema = new Schema({
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
    healthState: HealthStateSchema, // Subdocument schema
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
    isAdopted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Pre-save middleware to calculate 'consumption' before saving a document
CatSchema.pre('save', function (next) {
    this.consumption = calculateConsumption(this.healthState, this.size, this.age);
    next();
});

const Cat = models.Cat || mongoose.model("Cat", CatSchema);
export default Cat;
