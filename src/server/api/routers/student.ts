/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { email } from "better-auth";
import { createUserAccount } from "~/lib/create-account";

export const postStudent = createTRPCRouter({
    createStudent: protectedProcedure.input(
        z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string().optional(),
            gender: z.string(),
            address: z.string().optional(),
            birthDate: z.string().optional(),
            statusAccount: z.enum(["Active", "Inactive"]),
        })
    ).mutation(async ({ ctx, input }) => {
        // 1️⃣ Create student
        const student = await ctx.db.student.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phone: input.phone,
                gender: input.gender,
                address: input.address,
                birthDate: input.birthDate
                    ? new Date(input.birthDate)
                    : undefined,
            },
        });

        // 2️⃣ Create account jika ACTIVE
        if (input.statusAccount === "Active") {
            const password = "defaultPassword123";
            // const password = crypto.randomUUID().slice(0, 10);

            const signupResult = await createUserAccount({
                email: input.email,
                password: password,
                name: `${input.firstName} ${input.lastName}`,
                roleId: "student", // Ganti dengan roleId yang sesuai
            });

            const userId = signupResult.user?.id;

            if (!userId) {
                throw new Error("User ID not returned from signup");
            }

            // 3️⃣ Update student.userId
            await ctx.db.student.update({
                where: { id: student.id },
                data: {
                    userId: userId,
                },
            });

            // (optional) kirim email credential
        }

        return student;

    }),
    getStudent: protectedProcedure
        .input(
            z.object({
                page: z.number().default(1),
                limit: z.number().default(10),
                keyword: z.string().optional().default(""),
                status: z.string().optional().default(""),
            })
        )
        .query(async ({ ctx, input }) => {
            const { page, limit, keyword, status } = input;

            const skip = (page - 1) * limit;
            const where: any = {};


            if (keyword) {
                where.OR = [
                    { firstName: { contains: keyword, mode: "insensitive" } },
                    { lastName: { contains: keyword, mode: "insensitive" } },
                    { email: { contains: keyword, mode: "insensitive" } },
                ];
            }

            const statuses = status
                ? status.split(",").map((s) => s.trim().toLowerCase())
                : [];

            const hasActive = statuses.includes("active");
            const hasInactive = statuses.includes("inactive");

            if (hasActive && !hasInactive) {
                where.userId = { not: null };
            }

            if (!hasActive && hasInactive) {
                where.userId = null;
            }

            const [students, total] = await Promise.all([
                ctx.db.student.findMany({
                    skip,
                    take: limit,
                    where: where,
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
                ctx.db.student.count({ where }),
            ]);

            return {
                data: students,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            };
        }),

    getStudentStats: protectedProcedure.query(async ({ ctx }) => {
        const [male, female, registered, notRegistered] = await Promise.all([
            // Gender Male
            ctx.db.student.count({
                where: {
                    gender: "Male",
                },
            }),

            // Gender Female
            ctx.db.student.count({
                where: {
                    gender: "Female",
                },
            }),

            // Account registered (ada userId)
            ctx.db.student.count({
                where: {
                    userId: { not: null },
                },
            }),

            // Account NOT registered (userId null)
            ctx.db.student.count({
                where: {
                    userId: null,
                },
            }),
        ]);

        return {
            male,
            female,
            registered,
            notRegistered,
        };
    }),

    getStudentById: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const student = await ctx.db.student.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            roleId: true,
                            emailVerified: true,
                        },
                    },
                },
            });

            if (!student) {
                throw new Error("Student not found");
            }

            return {
                ...student,
                statusAccount: student.userId ? "Active" : "Inactive",
            };
        }),

    updateStudent: protectedProcedure
        .input(
            z.object({
                id: z.string(),

                firstName: z.string(),
                lastName: z.string().optional(),
                email: z.string().email(),
                phone: z.string().optional(),
                gender: z.string(),
                address: z.string(),
                birthDate: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const student = await ctx.db.student.findUnique({
                where: { id: input.id },
            });

            if (!student) {
                throw new Error("Student not found");
            }

            // (Optional) jika student sudah punya user,
            // kamu bisa lock email agar tidak berubah
            if (student.userId && input.email !== student.email) {
                throw new Error("Email cannot be changed for active account");
            }

            const updatedStudent = await ctx.db.student.update({
                where: { id: input.id },
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName ?? undefined,
                    email: input.email,
                    phone: input.phone ?? undefined,
                    gender: input.gender,
                    address: input.address,
                    birthDate: input.birthDate
                        ? new Date(input.birthDate)
                        : undefined,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            emailVerified: true,
                            roleId: true,
                        },
                    },
                },
            });

            return {
                id: updatedStudent.id,
                firstName: updatedStudent.firstName,
                lastName: updatedStudent.lastName ?? undefined,
                birthDate: updatedStudent.birthDate?.toISOString(),
                email: updatedStudent.email,
                address: updatedStudent.address,
                phone: updatedStudent.phone ?? undefined,
                gender: updatedStudent.gender ?? "",
                userId: updatedStudent.userId ?? null,
                createdAt: updatedStudent.createdAt.toISOString(),
                updatedAt: updatedStudent.updatedAt.toISOString(),

                user: updatedStudent.user
                    ? {
                        id: updatedStudent.user.id,
                        email: updatedStudent.user.email,
                        emailVerified: updatedStudent.user.emailVerified,
                        roleId: updatedStudent.user.roleId,
                    }
                    : null,

                statusAccount: updatedStudent.userId ? "Active" : "Inactive",
            };
        }),



})