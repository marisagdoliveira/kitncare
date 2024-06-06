import { connectMongoDB } from "@/lib/mongodb";
import Cat from "@/models/cat";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB();


        const cats = await Cat.find({}).lean();

        return NextResponse.json(cats, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while retrieving cats." }, { status: 500 });
    }
}
