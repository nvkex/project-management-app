import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.db.project.findMany({
                where: {
                    members: {
                        some: {
                            userId: ctx.session.user.id
                        }
                    }
                },
                include: {
                    members: true,
                    lead: true
                }
            });
        }),
    // split this
    getByAbbrv: protectedProcedure
        .input(z.object({ abbrv: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.project.findFirst({
                where: { abbreviation: input.abbrv },
                include: {
                    tasks: {
                        include: {
                            assignee: true
                        }
                    },
                    lead: true,
                    members: {
                        include: {
                            user: {
                                include: {
                                    assignedTasks: true
                                }
                            }
                        }
                    }
                }
            });
        }),
    create: protectedProcedure
        .input(z.object({ title: z.string(), description: z.string(), abbreviation: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.project.create({
                data: {
                    title: input.title,
                    description: input.description,
                    leadUserId: ctx.session.user.id,
                    abbreviation: input.abbreviation,
                    members: {
                        create: [
                            {
                                user: { connect: { id: ctx.session.user.id } },
                            }
                        ]
                    }
                },
                include: {
                    members: true,
                    lead: true
                }
            });
        }),
    getMembers: protectedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.project.findFirst({
                where: {
                    id: input.projectId,
                    members: {
                        some: {
                            userId: ctx.session.user.id
                        }
                    },
                },
                select: {
                    members: true
                }
            });
        }),
    addMembers: protectedProcedure
        .input(z.object({ projectId: z.string(), userIds: z.array(z.string()) }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.project.update({
                where: {
                    id: input.projectId,
                    leadUserId: ctx.session.user.id
                },
                data: {
                    members: {
                        create: input.userIds.map(userId => ({
                            user: { connect: { id: userId } },
                        }))
                    }
                },
                include: {
                    members: {
                        include: {
                            user: {
                                include: {
                                    assignedTasks: true
                                }
                            }
                        }
                    }
                }
            });
        }),
    updateTitle: protectedProcedure
        .input(z.object({ projectId: z.string(), title: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.project.update({
                where: {
                    id: input.projectId,
                    leadUserId: ctx.session.user.id
                },
                data: { title: input.title },
            });
        }),
})