import { connectMongoDB } from "@/lib/mongodb";
import Cat from "@/models/cat";
import Supplies from "@/models/supplies";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectMongoDB();
    try {
        const cats = await Cat.find({}).lean();

        let normalFoodConsumption = 0;
        let specialFoodConsumption = 0;
        let medkits = 0;

        cats.forEach(cat => {
            if (cat.consumption.foodType === "Normal") {
                normalFoodConsumption += parseInt(cat.consumption.quantity);
            } else if (cat.consumption.foodType === "Special") {
                specialFoodConsumption += parseInt(cat.consumption.quantity);
            }
            if (!cat.healthState.healthy) {
                medkits++;
            }
        });

        const suppliesCount = await Supplies.countDocuments();
        const sandConsumption = cats.length * 300;

        return NextResponse.json({
            normalFoodConsumption: normalFoodConsumption,
            specialFoodConsumption: specialFoodConsumption,
            sandConsumption: sandConsumption,
            medkits: medkits
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while fetching consumption data" }, { status: 500 });
    }
}
