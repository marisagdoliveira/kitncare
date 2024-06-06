import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Cat from "@/models/cat"; 
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();

        const url = new URL(req.url, "http://localhost");
        const params = new URLSearchParams(url.search);
        const catId = params.get("catId");

        // Check if catId is valid
        if (!mongoose.Types.ObjectId.isValid(catId)) {
            return NextResponse.json({ message: "Invalid catId." }, { status: 400 });
        }

        const getCat = await Cat.findOne({ _id: catId });

        if (!getCat) {
            return NextResponse.json({ message: "Cat not found." }, { status: 404 });
        }

        return NextResponse.json(getCat, { status: 200 }); // Return the cat object directly
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "An error occurred while finding the cat." },
            { status: 500 }
        );
    }
}
