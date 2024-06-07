import Supplies from "@/models/supplies";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function PATCH(req) {
    console.log("test");
    try {
        await connectMongoDB();
        const body = await req.json();
        const { normalFood, specialFood, sand, medKit } = body;

        let getSupplies = await Supplies.findOne();

        if (!getSupplies) {
            return NextResponse.json({ message: "Supplies not found." }, { status: 404 });
        }

        if (normalFood !== undefined) {
            getSupplies.normalFood += normalFood;
        }
        if (specialFood !== undefined) {
            getSupplies.specialFood += specialFood;
        }
        if (sand !== undefined) {
            getSupplies.sand += sand;
        }
        if (medKit !== undefined) {
            getSupplies.medKit += medKit;
        }

        await getSupplies.save();

        return NextResponse.json({ supplies: getSupplies }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while updating the supplies." }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectMongoDB();


        const cats = await Supplies.find({}).lean();

        return NextResponse.json(cats, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while retrieving cats." }, { status: 500 });
    }
}

