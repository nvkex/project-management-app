import Head from "next/head";
import { Prisma } from "@prisma/client";
import Link from "next/link";

import Button from "~/components/button";
import Input from "~/components/input";
import PageHead from "~/components/pageHead";
import Table from "~/components/table";
import BaseLayout from "~/layout/base";
import { api } from "~/utils/api";
import EditIcon from "~/components/icons/editIcon";
import { UserWithAvatar } from "~/components/userAvatar";

type ProjectItem = Prisma.ProjectGetPayload<{
    include: {
        members: true,
        lead: true
    }
}>

export default function Projects() {

    const { data = [] } = api.project.getAll.useQuery();

    const leadCell = (name: string, userId: string) => {
        return (
            <UserWithAvatar name={name} userId={userId} />
        )
    }

    const columns = [
        { name: " ", cell: (row: ProjectItem) => <Link className="hover:text-teal-700 " href={`/projects/${row.abbreviation}/edit`}><EditIcon /></Link> },
        { name: "Title", cell: (row: ProjectItem) => <Link className="text-teal-800 hover:text-teal-600 hover:underline" href={`/projects/${row.abbreviation}`}>{row.title}</Link> },
        { name: "Description", cell: (row: ProjectItem) => row.description },
        { name: "Key", cell: (row: ProjectItem) => <Link className="text-teal-800 hover:text-teal-600 hover:underline" href={`/projects/${row.abbreviation}`}>{row.abbreviation}</Link> },
        { name: "Members", cell: (row: ProjectItem) => row.members.length },
        { name: "Lead", cell: (row: ProjectItem) => leadCell(row.lead.name, row.lead.id) },
    ]

    return (<>
        <Head>
            <title>Projects - Project Management App</title>
            <meta name="description" content="Overview of tasks and members - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout>
            <div className="flex justify-between align-middle">
                <PageHead>Projects</PageHead>
                <Button onClick={() => { window.location.href = "/projects/create" }}>Create Project</Button>
            </div>
            <div className="pt-6">
                <Input placeholder="Search Projects" />
                <Table data={data} columns={columns} />
            </div>
        </BaseLayout>
    </>)
}