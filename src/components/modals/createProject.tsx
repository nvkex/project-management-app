import { FunctionComponent, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import { api } from "~/utils/api";
import CustomModal from "./customModal";

type CreateProjectProps = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    onSuccess?: () => void
}

const CreateProject: FunctionComponent<CreateProjectProps> = ({ isOpen, setIsOpen, onSuccess = () => { } }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [abbreviation, setAbbreviation] = useState('')
    const mutation = api.project.create.useMutation();

    const onSubmit = async () => {
        const formData = {
            title, description, abbreviation
        }
        const res = await mutation.mutate(formData);
        alert("Created!")
        onSuccess && onSuccess()
    }

    const clearState = () => {
        setTitle('')
        setDescription('')
        setAbbreviation('')
    }

    useEffect(() => {
        if (!isOpen)
            clearState()
    }, [isOpen])

    return (
        <CustomModal title="Create Project" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="mt-2 flex flex-col gap-3">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input placeholder="Abbreviation" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} />
            </div>
            <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
                <Button onClick={onSubmit} variant="primary">Submit</Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
        </CustomModal>
    )
}


export default CreateProject;