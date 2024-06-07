import Cat from "@/models/cat";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { name, age, sex, castrated, size, healthState } = await req.json();

        await connectMongoDB();

        // Create a new cat object with the calculated consumption
        const newCat = new Cat({
            name,
            age,
            sex,
            castrated,
            size,
            healthState,
            isAdopted: false, // Default value
        });

        // Calculate the consumption before saving
        newCat.consumption = calculateConsumption(newCat.healthState, newCat.size, newCat.age);

        // Save the new cat to the database
        const savedCat = await newCat.save();

        return NextResponse.json({ message: "Cat registered.", data: savedCat }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the cat.", error: error.message }, { status: 500 });
    }
}

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

    return { foodType, quantity: baseQuantity};
};

