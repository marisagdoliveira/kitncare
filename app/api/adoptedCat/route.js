import { connectMongoDB } from "@/lib/mongodb";
import AdoptedCat from "@/models/adoptedCat";
import mongoose from "mongoose";

import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();

        const url = new URL(req.url, "http://localhost");
        const params = new URLSearchParams(url.search);
        const catId = params.get("catId");

        
        if (!mongoose.Types.ObjectId.isValid(catId)) {
            return NextResponse.json({ message: "Invalid catId." }, { status: 400 });
        }

        const getCat = await AdoptedCat.findOne({ _id: catId }); 

        if (!getCat) {
            return NextResponse.json({ message: "Cat not found." }, { status: 404 });
        }

        return NextResponse.json(getCat, { status: 200 }); 
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "An error occurred while finding the cat." },
            { status: 500 }
        );
    }
}
