import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
    getAll: protectedProcedure
        .query(({ ctx }) => {
            return ctx.db.project.findMany({
                where: { userId: ctx.session.user.id }
            });
        }),
    create: protectedProcedure
        .input(z.object({ title: z.string(), description: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.project.create({
                data: {
                    title: input.title,
                    description: input.description,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            });
        })
})