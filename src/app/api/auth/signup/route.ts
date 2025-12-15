import { auth } from "~/server/better-auth";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, name } = body;
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name
            }
        })

        return NextResponse.json({ message: "User registered successfully. Please check your email to verify your account." }, { status: 200 });
    } catch (error: any) {
        console.error("Error during user signup:", error);
        if (error.body.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            return NextResponse.json({ message: error.body.message, error }, { status: error.statusCode });
        }
        return NextResponse.json({ message: "Error registering user.", error }, { status: 400 });
    }
}