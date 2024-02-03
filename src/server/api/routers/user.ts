import { type Prisma } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getUserProfile: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.user.findFirst({
                where: {
                    id: input.userId
                },
                include: {
                    assignedTasks: true,
                    projectLead: true,
                    projects: {
                        include: {
                            project: true
                        }
                    }
                }
            });
        }),
    getDetailedUserData: protectedProcedure
        .query(({ ctx }) => {
            return ctx.db.user.findFirst({
                where: {
                    id: ctx.session.user.id
                },
                include: {
                    assignedTasks: true,
                    projectLead: true,
                    projects: {
                        include: {
                            project: true
                        }
                    }
                }
            });
        }),
    updateUserProfile: protectedProcedure
        .input(z.object({
            name: z.string().nullish(),
            department: z.string().nullish(),
            organization: z.string().nullish(),
            location: z.string().nullish(),
            shade: z.string().nullish(),
        }))
        .mutation(({ ctx, input }) => {
            const data: Prisma.UserUpdateInput = {}
            if (input.name)
                data.name = input.name
            if (input.department)
                data.department = input.department
            if (input.organization)
                data.organization = input.organization
            if (input.location)
                data.location = input.location
            if (input.shade)
                data.shade = input.shade

            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id
                },
                data
            });
        }),
    getUsersNotInProject: protectedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.user.findMany({
                where: {
                    projects: {
                        none: {
                            projectId: input.projectId,
                        },
                    },
                },
            });
        }),
    create: publicProcedure
        .input(z.object({ name: z.string(), email: z.string(), password: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    password: input.password
                },
            });
        }),
    authorize: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.user.findFirst({
                where: {
                    email: input.email,
                    password: input.password
                },
            });
        }),
})