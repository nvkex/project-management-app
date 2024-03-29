import { type Prisma } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FunctionComponent, useState } from 'react';

import Button from '~/components/atomic/button';
import AddMember from '~/components/modals/addMember';
import PageHead from '~/components/sections/pageHead';
import Table from '~/components/atomic/table';
import { UserWithAvatar } from '~/components/atomic/userAvatar';
import BaseLayout from '~/layout/base';
import { api, type RouterOutputs } from '~/utils/api';
import { getArray, groupBy } from '~/utils/utilities';
import { useSession } from 'next-auth/react';
import Input from '~/components/atomic/input';
import { Transition } from '@headlessui/react';
import { notification } from '~/components/atomic/notification';

// Type definitions
type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];
type ProjectMemberType = Prisma.ProjectsAndUsersGetPayload<{
    include: {
        user: {
            include: {
                assignedTasks: true
            }
        }
    }
}>
type ProjectTaskType = Prisma.TaskGetPayload<{
    include: {
        assignee: true
    }
}>
type MembersTableProps = {
    members: Array<ProjectMemberType>
}
type TasksTableProps = {
    tasks: Array<ProjectTaskType>,
    keyColumn: "status" | "priority",
    label: string
}
type GroupedTaskItemByStatus = {
    "status"?: string,
    "priority"?: string,
    tasks: ProjectTaskType[]
}


// Components
const MembersTable: FunctionComponent<MembersTableProps> = ({ members = [] }) => {
    const columns = [
        { name: "Assignee", cell: (row: ProjectMemberType) => <div><UserWithAvatar name={row.user.name} userId={row.user.id} shade={row.user.shade} /></div> },
        { name: "Tasks", cell: (row: ProjectMemberType) => row.user.assignedTasks.length },
    ]

    return (
        <Table data={members} columns={columns} />
    )
}

const GroupedTaskTable: FunctionComponent<TasksTableProps> = ({ tasks = [], keyColumn, label }) => {
    const groupedTasks = getArray(groupBy(tasks, keyColumn), keyColumn, 'tasks')
    const columns = [
        { name: label, cell: (row: GroupedTaskItemByStatus) => row[keyColumn] },
        { name: "Tasks", cell: (row: GroupedTaskItemByStatus) => row.tasks.length },
    ]

    return (
        <Table data={groupedTasks} columns={columns} />
    )
}

function ProjectDetails(props: { project: ProjectByIdOutput, loading: boolean }) {

    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
    const [project, setProject] = useState<ProjectByIdOutput>(props.project)
    const [title, setTitle] = useState(project?.title)

    const { data: sessionData } = useSession();
    const mutation = api.project.updateTitle.useMutation();

    const isUserLead = sessionData?.user.id === project?.leadUserId

    const hasProjectTitleChanged = (project && project.title !== title) ?? false

    // --------------------------Event Handlers--------------------------
    const onProjectTitleChange = async () => {
        if (!project) return
        if (!title || title.length == 0) {
            notification("Invalid title.", "error", "title-error-msg")
            return
        }
        try {
            const res = await mutation.mutateAsync({ title, projectId: project.id })
            if (res?.title) {
                project.title = res.title
                setProject(project)
                notification("Title updated.", "success", "title-update-msg")
            }
        }
        catch (e) {
            notification("Update failed! Please try again.", "error", "title-update-failure-msg")
        }
    }

    const onMemberUpdate = () => {
        notification("Members added!", "success", "member-add-msg")
    }

    return (
        <>
            <div className="flex justify-between align-middle">
                <PageHead>
                    <div className='flex gap-2'>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} disabled={!isUserLead} />
                        <Transition
                            show={hasProjectTitleChanged}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className='flex h-full'><Button onClick={onProjectTitleChange}>Save</Button></div>
                        </Transition>
                    </div>

                </PageHead>
                <div>
                    <UserWithAvatar userId={project?.leadUserId ?? ''} name={project?.lead.name ?? ''} shade={project?.lead.shade} />
                </div>
            </div>
            <div className="pt-6">
                <p className="text-gray-500">{project?.description}</p>
                <em className="text-gray-400">
                    <small>Created:{project?.createdAt.toLocaleDateString('en-us')}</small>
                </em>
            </div>
            <div className="pt-6 flex justify-between">
                <div className='relative bg-gray-50 p-4 shadow-sm rounded-md h-80' style={{ width: 400 }}>
                    <div className='font-medium text-[hsl(280,13.34%,40.04%)]'>Team Workload</div>
                    <div className="overflow-y-auto overflow-x-hidden my-1" style={{ height: 212 }}>
                        <MembersTable members={project?.members ?? []} />
                    </div>
                    <div className='absolute bottom-4 left-4'>
                        <Button onClick={() => isUserLead && setShowAddMemberDialog(true)} disabled={!isUserLead}>Add Member</Button>
                    </div>
                </div>
                <div className='relative bg-gray-50 p-4 shadow-sm rounded-md h-80' style={{ width: 400 }}>
                    <div className='font-medium text-[hsl(280,13.34%,40.04%)] mb-2'>Task Distribution</div>
                    <div className="overflow-y-auto overflow-x-hidden my-1" style={{ height: 212 }}>
                        <GroupedTaskTable tasks={project?.tasks ?? []} keyColumn="status" label="Status" />
                    </div>
                    <div className='absolute bottom-4 left-4'>
                        <Link href={`/projects/${project?.abbreviation}/tasks`}>
                            <Button>View Tasks</Button>
                        </Link>
                    </div>
                </div>
                <div className='relative bg-gray-50 p-4 shadow-sm rounded-md h-80' style={{ width: 400 }}>
                    <div className='font-medium text-[hsl(280,13.34%,40.04%)] mb-2'>Priority Breakdown</div>
                    <div className="overflow-y-auto overflow-x-hidden my-1" style={{ height: 212 }}>
                        <GroupedTaskTable tasks={project?.tasks ?? []} keyColumn="priority" label="Priority" />
                    </div>
                </div>
            </div>
            <AddMember projectId={project?.id} setIsOpen={setShowAddMemberDialog} isOpen={showAddMemberDialog} onSuccess={onMemberUpdate} />
        </>
    );
}

const ProjectViewPage = () => {
    const abbrv = useRouter().query.abbrv as string;
    const postQuery = api.project.getByAbbrv.useQuery({ abbrv });
    const { data } = postQuery;
    return <>
        <Head>
            <title>Summary - Project Management App</title>
            <meta name="description" content="Overview of tasks and members - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout apiDependency={postQuery}>
            {data && <ProjectDetails project={data} loading={postQuery.status !== 'success'} />}
        </BaseLayout>
    </>
};

export default ProjectViewPage;