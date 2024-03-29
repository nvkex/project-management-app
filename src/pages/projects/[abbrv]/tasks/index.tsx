import Head from "next/head";
import { type Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { type FunctionComponent, useState, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";

import Button from "~/components/atomic/button";
import PageHead from "~/components/sections/pageHead";
import BaseLayout from "~/layout/base";
import { type RouterOutputs, api } from "~/utils/api";
import Badge from "~/components/atomic/badge";
import AddTask from "~/components/modals/createTask";
import { STATUS_ENUM, statusBadgeVariantConfig } from "~/utils/statusConstants";
import { priorityBadgeVariantConfig } from "~/utils/priorityConstants";
import { UserWithAvatar } from "~/components/atomic/userAvatar";
import UpdateTask from "~/components/modals/updateTask";
import { notification } from "~/components/atomic/notification";

type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];

type TaskItem = Prisma.TaskGetPayload<{
    include: {
        assignee: true
    }
}>

// -----------Task Card List-----------
type TaskListProps = {
    tasks: Array<TaskItem>,
    status: string,
    onTaskClick: (task: TaskItem) => void
}

const TaskList: FunctionComponent<TaskListProps> = ({ tasks, status, onTaskClick }) => {
    const taskListByStatus = tasks.filter(task => task.status == status)
    return (
        <>
            {
                taskListByStatus.map((task, _i) => (
                    <div key={`task-${status}-${_i}`} className="bg-white rounded-md ring-1 ring-gray-200 p-3 text-sm my-2 hover:cursor-pointer hover:bg-teal-50 hover:ring-teal-200" onClick={() => onTaskClick(task)} >
                        <div className="font-normal">{task.title}</div>
                        <div className="flex justify-between my-2">
                            <div><Badge variant="tertiary">{`${task.ticketId}`}</Badge></div>
                            <div><Badge variant={priorityBadgeVariantConfig[task.priority]}>{task.priority}</Badge></div>
                        </div>
                        <div className="flex justify-between my-2">
                            {
                                task.startDate ? <Badge asDiv>
                                    <div className="flex align-middle gap-1">
                                        <CalendarIcon height={15} width={15} />
                                        <div>{`${task.startDate.toLocaleDateString()}`}</div>
                                    </div>
                                </Badge> : <div></div>
                            }
                            {
                                task.endDate ? <Badge asDiv>
                                    <div className="flex align-middle gap-1">
                                        <CalendarIcon height={15} width={15} />
                                        <div>{`${task.endDate.toLocaleDateString()}`}</div>
                                    </div>
                                </Badge> : <div></div>
                            }
                        </div>
                        <div className="my-2">
                            {
                                task.assignee && <UserWithAvatar name={task.assignee.name} userId={task.assignee.id} shade={task.assignee.shade} />
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

// -----------Task Column-----------
type TaskListColumnType = {
    data?: ProjectByIdOutput,
    taskStatus: STATUS_ENUM,
    onTaskClick: (task: TaskItem) => void
}

const TaskListColumn: FunctionComponent<TaskListColumnType> = ({ data, taskStatus, onTaskClick }) => {
    return (
        <div className='relative bg-gray-50 p-4 shadow-sm rounded-md w-96' style={{ height: "78vh" }}>
            <span className='pl-1 font-medium text-[hsl(280,13.34%,40.04%)]'>
                <Badge variant={statusBadgeVariantConfig[taskStatus.valueOf()]}>{taskStatus.valueOf()}</Badge>
            </span>
            <div className="overflow-y-auto overflow-x-hidden p-1 mt-1" style={{ height: "94%" }}>
                <TaskList status={taskStatus.valueOf()} tasks={data?.tasks ?? []} onTaskClick={onTaskClick} />
            </div>
        </div>
    )
}

// -----------Page Container-----------
export default function Tasks() {
    const abbrv = useRouter().query.abbrv as string;
    const postQuery = api.project.getByAbbrv.useQuery({ abbrv: abbrv || "" });
    const { data: projectData } = postQuery

    const [data, setData] = useState<ProjectByIdOutput | undefined | null>(projectData)
    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
    const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)

    // const { data } = postQuery;

    const onTaskCreationSuccess = (taskData: TaskItem) => {
        data?.tasks.push(taskData)
        setData(data)
        notification("Task created!", "success", "task-create-msg")  
    }

    const onTaskClick = (task: TaskItem) => {
        setSelectedTask(task)
        setIsUpdateTaskDialogOpen(true)
    }

    const onTaskUpdateSuccess = (taskData: TaskItem) => {
        if (!data) return
        const idx = data.tasks.findIndex(t => t.id === taskData.id)
        data.tasks[idx] = taskData
        setData(data)
        notification("Task updated!", "success", "task-update-msg")  
    }

    useEffect(() => {
        setData(projectData)
    }, [projectData])

    return (<>
        <Head>
            <title>Tasks - Project Management App</title>
            <meta name="description" content="Overview of tasks and members - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout apiDependency={postQuery}>
            <AddTask project={data} isOpen={isAddTaskDialogOpen} setIsOpen={setIsAddTaskDialogOpen} onSuccess={onTaskCreationSuccess} />
            <UpdateTask task={selectedTask} project={data} isOpen={isUpdateTaskDialogOpen} setIsOpen={setIsUpdateTaskDialogOpen} onSuccess={onTaskUpdateSuccess} />
            <div className="flex justify-between align-middle">
                <PageHead><Link className="text-teal-500 hover:underline" href={`/projects/${data?.abbreviation}`}>{data?.abbreviation}</Link>: Tasks</PageHead>
                <Button onClick={() => setIsAddTaskDialogOpen(true)} variant="primary">Create Task</Button>
            </div>
            <div className="pt-6 flex justify-between h-full">
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.TODO} onTaskClick={onTaskClick} />
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.IN_PROGRESS} onTaskClick={onTaskClick} />
                <TaskListColumn data={data} taskStatus={STATUS_ENUM.DONE} onTaskClick={onTaskClick} />
            </div>
        </BaseLayout>
    </>)
}