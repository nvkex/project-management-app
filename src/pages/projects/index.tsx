import Head from "next/head";
import { type Prisma } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "~/components/atomic/button";
import Input from "~/components/atomic/input";
import PageHead from "~/components/sections/pageHead";
import Table from "~/components/atomic/table";
import BaseLayout from "~/layout/base";
import { api } from "~/utils/api";
import { UserWithAvatar } from "~/components/atomic/userAvatar";
import CreateProject from "~/components/modals/createProject";
import { notification } from "~/components/atomic/notification";

type ProjectItem = Prisma.ProjectGetPayload<{
    include: {
        members: true,
        lead: true
    }
}>

export default function Projects() {

    const getQuery = api.project.getAll.useQuery();
    const { data = [] } = getQuery;

    const [filteredProjects, setFilteredProjects] = useState(data)
    const [filterText, setFilterText] = useState('')
    const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false)

    const onProjectCreationSuccess = (projectData: ProjectItem) => {
        data.push(projectData)
        notification("Project created", "success", "project-create-msg")
    }

    const leadCell = (name: string, userId: string, shade: string) => {
        return (
            <UserWithAvatar name={name} userId={userId} shade={shade} />
        )
    }

    const columns = [
        { name: "Title", cell: (row: ProjectItem) => <Link className="text-teal-800 hover:text-teal-600 hover:underline" href={`/projects/${row.abbreviation}`}>{row.title}</Link> },
        { name: "Description", cell: (row: ProjectItem) => row.description },
        { name: "Key", cell: (row: ProjectItem) => <Link className="text-teal-800 hover:text-teal-600 hover:underline" href={`/projects/${row.abbreviation}`}>{row.abbreviation}</Link> },
        { name: "Members", cell: (row: ProjectItem) => row.members.length },
        { name: "Lead", cell: (row: ProjectItem) => leadCell(row.lead.name, row.lead.id, row.lead.shade) },
        // { name: " ", cell: (row: ProjectItem) => <Link className="hover:text-teal-700 " href={`/projects/${row.abbreviation}/edit`}><EllipsisVerticalIcon /></Link> },
    ]

    useEffect(() => {
        if (filterText.length !== 0) {
            setFilteredProjects(data.filter(d => d.title.toLowerCase().includes(filterText)))
        } else {
            setFilteredProjects(data)
        }
    }, [filterText, data])

    useEffect(() => {
        setFilteredProjects(data)
    }, [data])

    return (<>
        <Head>
            <title>Projects - Project Management App</title>
            <meta name="description" content="Overview of tasks and members - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout apiDependency={getQuery}>
            <CreateProject isOpen={isCreateProjectDialogOpen} setIsOpen={setIsCreateProjectDialogOpen} onSuccess={onProjectCreationSuccess} />
            <div className="flex justify-between align-middle">
                <PageHead>Projects</PageHead>
                <Button variant="primary" onClick={() => setIsCreateProjectDialogOpen(true)}>Create Project</Button>
            </div>
            <div className="pt-6">
                <Input placeholder="Search Projects" value={filterText} onChange={(e) => setFilterText(e.target.value.toLowerCase())} />
                <div className="pt-2">
                    {
                        filteredProjects.length == 0 ? <div className="text-center text-gray-500">No Data</div> : <Table data={filteredProjects} columns={columns} />
                    }
                </div>
            </div>
        </BaseLayout>
    </>)
}