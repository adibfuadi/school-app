import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await auth.api.signOut({ headers: req.headers });
        return NextResponse.json({ message: "User signput in successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error during user signout:", error);
        return NextResponse.json({ message: "Error signing out user.", error }, { status: 400 });

    }
}