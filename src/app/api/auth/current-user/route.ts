import { NextResponse } from "next/server"
import { auth } from "~/server/better-auth";

export async function GET(req: Request) {
    const session = await auth.api.getSession(req);

    if (!session || !session.user) {
        return NextResponse.json({ message: "No authenticated user.", user: null }, { status: 401 });
    }

    return NextResponse.json({ message: "Authenticated user retrieved successfully.", user: session.user }, { status: 200 });
}