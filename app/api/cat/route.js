import { connectMongoDB } from "@/lib/mongodb";


export async function GET(req) {
    try {
        await connectMongoDB();
    
        const url = new URL(req.url, "http://localhost");
        const params = new URLSearchParams(url.search);
        const catId = params.get("catId");
        const getCat = await Cat.findOne({ _id: catId });
    
        if (!getCat) {
            return NextResponse.json({ message: "Cat not found." }, { status: 404 });
        }
    
        return NextResponse.json({ user: getCat }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "An error occurred while finding the cat." },
            { status: 500 }
        );
    }
    }