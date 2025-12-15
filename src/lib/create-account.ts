import { auth } from "~/server/better-auth";

// server/services/auth.service.ts
export const createUserAccount = async ({
    email,
    password,
    name,
    roleId
}: {
    email: string;
    password: string;
    name: string;
    roleId: string
}) => {
    // langsung ke better-auth / prisma / auth logic
    // console.log("Creating user account with email:", email);
    const user = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            roleId, // default role ID for regular users
        }
    });

    // console.log("SIGNUP RESULT:", user);


    return user;
};
