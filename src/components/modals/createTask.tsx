import { FunctionComponent, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import { RouterInputs, RouterOutputs, api } from "~/utils/api";
import CustomModal from "./customModal";
import Dropdown, { DropdownOptionsType } from "../dropdown";
import { STATUS, STATUS_LIST_AS_OPTIONS, statusBadgeVariantConfig } from "~/utils/statusConstants";
import { PRIORITY, PRIORITY_LIST_AS_OPTIONS, priorityBadgeVariantConfig } from "~/utils/priorityConstants";
import Badge from "../badge";
import { UserWithAvatar } from "../userAvatar";

type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];
type CreateTaskPayload = RouterInputs["task"]["create"]

type AddTaskProps = {
    project?: ProjectByIdOutput,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    onSuccess?: () => void
}

const AddTask: FunctionComponent<AddTaskProps> = ({ project, isOpen, setIsOpen, onSuccess = () => { } }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assignee, setAssignee] = useState<DropdownOptionsType | null>(null)
    const [status, setStatus] = useState(STATUS_LIST_AS_OPTIONS[0])
    const [priority, setPriority] = useState(PRIORITY_LIST_AS_OPTIONS[0])

    const mutation = api.task.create.useMutation();

    const memberList: Array<DropdownOptionsType> = project?.members.map(member => ({ label: member.user.name, value: member.userId })) || []

    const clearState = () => {
        setTitle('')
        setDescription('')
        setAssignee(null)
        setStatus(STATUS_LIST_AS_OPTIONS[0])
        setPriority(PRIORITY_LIST_AS_OPTIONS[0])
    }

    const onSubmit = async () => {
        if (!project)
            return

        const payload: CreateTaskPayload = {
            title, description, projectId: project.id,
            status: status?.value || null,
            assigneeId: null,
            priority: priority?.value || null
        }

        if (assignee)
            payload['assigneeId'] = assignee.value

        const res = await mutation.mutate(payload);
        onSuccess && onSuccess()
        setIsOpen && setIsOpen(false)
    }

    const getStatusBadgeVariant = () => {
        return statusBadgeVariantConfig[status?.value || STATUS.TODO]
    }

    const getPriorityBadgeVariant = () => {
        return priorityBadgeVariantConfig[priority?.value || PRIORITY.LOW]
    }

    useEffect(() => {
        if (!isOpen)
            clearState()
    }, [isOpen])

    return project && (
        <CustomModal title="Create Task" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="mt-2 flex flex-col gap-3">
                <Input style={{ width: "100%" }} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input style={{ width: "100%" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <Dropdown id="create-task-assignee" placeholder="Add Assignee" options={memberList} selected={assignee} onSelect={setAssignee} selectedLabel={selected => <UserWithAvatar name={selected?.label || ""} userId={selected?.value || ""} shade={selected?.shade} disableLink />} />
                <Dropdown id="create-task-status" options={STATUS_LIST_AS_OPTIONS} selected={status} onSelect={setStatus} selectedLabel={selected => <span>Status: <Badge variant={getStatusBadgeVariant()}>{selected?.value}</Badge></span>} />
                <Dropdown id="create-task-priority" options={PRIORITY_LIST_AS_OPTIONS} selected={priority} onSelect={setPriority} selectedLabel={selected => <span>Priority: <Badge variant={getPriorityBadgeVariant()}>{selected?.value}</Badge></span>} />
            </div>
            <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
                <Button onClick={onSubmit} variant="primary">Submit</Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
        </CustomModal>
    )
}


export default AddTask;