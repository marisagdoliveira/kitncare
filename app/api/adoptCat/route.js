import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";

import AdoptedCat from "@/models/adoptedCat";
import { NextResponse } from "next/server";
import Cat from "@/models/cat";

export async function GET(req) {
    let catId;

    try {
        await connectMongoDB();

        const url = new URL(req.url, "http://localhost");
        const params = new URLSearchParams(url.search);
        catId = params.get("catId");

        console.log("Fetching cat with ID:", catId); 

        if (!mongoose.Types.ObjectId.isValid(catId)) {
            return NextResponse.json({ message: "Invalid catId." }, { status: 400 });
        }

        const cat = await Cat.findById(catId);

        console.log("Fetched cat:", cat); 

        if (!cat) {
            return NextResponse.json({ message: "Cat not found." }, { status: 404 });
        }
 
        await Cat.findOneAndDelete({ _id: catId });

        console.log("Removed cat with ID:", catId); 

        const adoptedCat = await adoptCat(cat);

        console.log("Adopted cat:", adoptedCat); 

        return NextResponse.json(adoptedCat, { status: 200 });
    } catch (error) {
        console.error("Error adopting cat:", error);
        return NextResponse.json(
            { message: "An error occurred while adopting the cat.", catId, error },
            { status: 500 }
        );
    }
}

async function adoptCat(cat) {
    try {
        
        const adoptedCat = new AdoptedCat({
            name: cat.name,
            age: cat.age,
            sex: cat.sex,
            castrated: cat.castrated,
            size: cat.size,
            healthState: cat.healthState,
            consumption: cat.consumption
        });

        console.log("Created adopted cat:", adoptedCat); 

        
        await adoptedCat.save();

        console.log("Saved adopted cat:", adoptedCat); 

        return adoptedCat;
    } catch (error) {
        console.error("Error adopting cat:", error);
        throw error;
    }
}

