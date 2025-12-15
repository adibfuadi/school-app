export const Gender = {
    Male: "Male",
    Female: "Female",
} as const;
export type GenderTypeEnum = keyof typeof Gender;

export const StatusAcount = {
    Active: "Active",
    Inactive: "Inactive",
} as const;
export type StatusAcountTypeEnum = keyof typeof StatusAcount;


export const ROLE_ACCESS = {
    admin: [
        "/dashboard",
        "/students",
        "/teachers",
        "/parents",
        "/subjects",
        "/classes",
        "/lessons",
        "/exams",
        "/assignments",
        "/results",
        "/attendance",
    ],

    teacher: [
        "/dashboard",
        "/students",
        "/subjects",
        "/classes",
        "/lessons",
        "/exams",
    ],

    student: [
        "/dashboard",
        "/subjects",
        "/classes",
        "/lessons",
        "/exams",
    ],
} as const;

export type UserRole = keyof typeof ROLE_ACCESS;