import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAllUsers: protectedProcedure
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