
export type StudentType = {
    id: string;
    firstName: string;
    lastName?: string;
    birthDate?: string;
    email: string;
    address: string
    phone?: string;
    gender: string
    statusAccount: string;
    userId?: string | null;
    user: {
        id: string;
        email: string;
        emailVerfied: boolean;
        roleId: string;
    } | null;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
};