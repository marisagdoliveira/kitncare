import Supplies from "@/models/supplies";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function PATCH(req) {
    console.log("test");
    try {
        await connectMongoDB();
        const body = await req.json();
        const { normalFood, specialFood, areia, medKit } = body;

        let getSupplies = await Supplies.findOne();

        if (!getSupplies) {
            return NextResponse.json({ message: "Supplies not found." }, { status: 404 });
        }

        // Update supplies if values are provided
        if (normalFood !== undefined) {
            getSupplies.normalFood = normalFood;
        }
        if (specialFood !== undefined) {
            getSupplies.specialFood = specialFood;
        }
        if (areia !== undefined) {
            getSupplies.areia = areia;
        }
        if (medKit !== undefined) {
            getSupplies.medKit = medKit;
        }

        await getSupplies.save();

        return NextResponse.json({ supplies: getSupplies }, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: "An error occurred while updating the supplies." }, { status: 500 });
    }
}

