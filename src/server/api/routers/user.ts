import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
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
        .input(z.object({ name: z.string(), shade: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id
                },
                data: {
                    name: input.name,
                    shade: input.shade
                }
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
        })
})