import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
    getAllTasksLinked: protectedProcedure
        .query(({ ctx }) => {
            return ctx.db.task.findMany({
                where: {
                    OR: [
                        { assigneeId: ctx.session.user.id },
                        { createdById: ctx.session.user.id }
                    ]
                }
            });
        }),
    getAssignedTasks: protectedProcedure
        .query(({ ctx }) => {
            return ctx.db.task.findMany({
                where: { assigneeId: ctx.session.user.id }
            });
        }),
    create: protectedProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            projectId: z.string(),
            assigneeId: z.string().nullable(),
            status: z.string().nullable(),
            priority: z.string().nullable(),
        }))
        .mutation(async ({ ctx, input }) => {
            // Fetch lastCreatedTaskId and abbreviation from the associated project
            const projectInfo = await ctx.db.project.findFirst({
                where: { id: input.projectId },
                select: { lastCreatedTaskId: true, abbreviation: true },
            });
            // Merge the values to create the ticketId for task
            let mergedTicketId = ""
            if (projectInfo)
                mergedTicketId = `${projectInfo.abbreviation}-${projectInfo.lastCreatedTaskId + 1}`;

            const payload: Prisma.TaskCreateInput = {
                title: input.title,
                description: input.description,
                assignee: { connect: { id: ctx.session.user.id } },
                createdBy: { connect: { id: ctx.session.user.id } },
                project: { connect: { id: input.projectId } },
                ticketId: mergedTicketId
            }

            if (input.assigneeId)
                payload['assignee'] = { connect: { id: input.assigneeId } }
            if (input.status)
                payload['status'] = input.status
            if (input.priority)
                payload['priority'] = input.priority

            return ctx.db.task.create({
                data: payload,
            });
        }),
    updateAssignee: protectedProcedure
        .input(z.object({ newAssignee: z.string(), taskId: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.task.update({
                where: {
                    id: input.taskId
                },
                data: {
                    assignee: { connect: { id: ctx.session.user.id } }
                },
            });
        }),
})