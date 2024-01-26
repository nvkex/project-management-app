import Head from "next/head";
import React, { useState } from "react";

import Button from "~/components/button";
import Input from "~/components/input";
import PageHead from "~/components/pageHead";
import BaseLayout from "~/layout/base";
import { api } from "~/utils/api";

const CreateProject = ({ }) => {

    const [formData, setFormData] = useState({})
    const mutation = api.project.create.useMutation();

    const onSubmit = async () => {
        const res = await mutation.mutate(formData);
        alert("Created!")
        // Do somethign here
        console.log(res)
    }

    const onFormValueChange = (key, val) => {
        setFormData(d => {
            d[key] = val
            return d
        })
    }

    return (<>
        <Head>
            <title>Create Project - Project Management App</title>
            <meta name="description" content="Create new project - Project Management App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BaseLayout>
            <PageHead>Create Project</PageHead>
            <div className="pt-6 flex justify-center">
                <div className="border-2 border-teal-50 rounded-lg py-6 px-10 w-40">
                    <div className="grid grid-cols-1 gap-4">
                        <Input placeholder="Title" value={formData.title} onChange={(e) => onFormValueChange("title", e.target.value)} />
                        <Input placeholder="Description" value={formData.description} onChange={(e) => onFormValueChange("description", e.target.value)} />
                        <Input placeholder="Abbreviation" value={formData.abbreviation} onChange={(e) => onFormValueChange("abbreviation", e.target.value)} />
                        <Button onClick={onSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    </>)
}

export default CreateProject