import { NextResponse } from "next/server"
import { auth } from "~/server/better-auth";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    try {
        const session = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        return NextResponse.json({ message: "User signed in successfully.", session }, { status: 200 });
    } catch (err: any) {
        console.error("Error during user signin:", err);
        if (err.body.code === "EMAIL_NOT_VERIFIED") {
            return NextResponse.json({ message: "Email not verified. Please check your email for the verification link." }, { status: 403 });
        }

        if (err.body.code === "INVALID_EMAIL_OR_PASSWORD") {
            return NextResponse.json({ message: err.body.message }, { status: err.statusCode });

        }

        return NextResponse.json({ message: "Error signing in user.", error: err }, { status: 400 });

    }
}