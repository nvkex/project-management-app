import Head from "next/head";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import NextError from 'next/error';

import Button from "~/components/button";
import PageHead from "~/components/pageHead";
import BaseLayout from "~/layout/base";
import { RouterOutputs, api } from "~/utils/api";
import Badge from "~/components/badge";
import { FunctionComponent, useState } from "react";
import AddTask from "~/components/modals/createTask";
import { STATUS, STATUS_ENUM, statusBadgeVariantConfig } from "~/utils/statusConstants";
import { priorityBadgeVariantConfig } from "~/utils/priorityConstants";
import { UserWithAvatar } from "~/components/userAvatar";

type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];

type TaskItem = Prisma.TaskGetPayload<{
    include: {
        assignee: true
    }
}>

type TaskListProps = {
    tasks: Array<TaskItem>,
    status: string
}

type TaskListColumnType = {
    data?: ProjectByIdOutput,
    taskStatus: STATUS_ENUM
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, status }) => {
    const taskListByStatus = tasks.filter(task => task.status == status)
    return (
        <>
            {
                taskListByStatus.map((task, _i) => (
                    <div key={`task-${status}-${_i}`} className="bg-white rounded-md ring-1 ring-gray-200 p-3 text-sm my-2">
                        <div className="font-normal">{task.title}</div>
                        <div className="flex justify-between my-2">
                            <div><Badge>{`${task.ticketId}`}</Badge></div>
                            <div><Badge variant={priorityBadgeVariantConfig[task.priority]}>{task.priority}</Badge></div>
                        </div>
                        <div className="my-2">
                            {
                                task.assignee && <UserWithAvatar name={task.assignee.name} userId={task.assignee.id} />
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const TaskListColumn: FunctionComponent<TaskListColumnType> = ({ data, taskStatus }) => {
    return (
        <div className='relative bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200 rounded-md w-96' style={{ height: "78vh" }}>
            <div className='pl-1 font-medium text-[hsl(280,13.34%,40.04%)]'>
                <Badge variant={statusBadgeVariantConfig[taskStatus.valueOf()]}>{taskStatus.valueOf()}</Badge>
            </div>
            <div className="overflow-y-auto overflow-x-hidden p-1" style={{ height: "94%" }}>
                <TaskList status={taskStatus.valueOf()} tasks={data?.tasks || []} />
            </div>
        </div>
    )
}

export default function Tasks() {
    const abbrv = useRouter().query.abbrv as string;
    const postQuery = api.project.getByAbbrv.useQuery({ abbrv: abbrv || "" });

    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)

    if (postQuery.error) {
        return (
            <NextError
                title={postQuery.error.message}
                statusCode={postQuery.error.data?.httpStatus ?? 500}
            />
        );
    }
    const { data } = postQuery;

    const onTaskCreationSuccess = () => {
        window.location.reload()
    }

    return (<>
        <Head>
            <title>Tasks - Project Management App</title>
            <meta name="description" content="Overview of tasks and members - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout>
            <AddTask project={data} isOpen={isAddTaskDialogOpen} setIsOpen={setIsAddTaskDialogOpen} onSuccess={onTaskCreationSuccess} />
            <div className="flex justify-between align-middle">
                <PageHead>{data?.abbreviation}: Tasks</PageHead>
                <Button onClick={() => setIsAddTaskDialogOpen(true)} variant="primary">Create Task</Button>
            </div>
            <div className="pt-6 flex justify-between h-full">
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.TODO} />
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.IN_PROGRESS} />
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.DONE} />
            </div>
        </BaseLayout>
    </>)
}