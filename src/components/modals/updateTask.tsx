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
import { Prisma } from "@prisma/client";

type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];
type UpdateTaskPayload = RouterInputs["task"]["updateProperties"]
type TaskPayload = Prisma.TaskGetPayload<{ include: { assignee: true } }>

type UpdateTaskProps = {
    task: TaskPayload | null,
    project?: ProjectByIdOutput,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    onSuccess?: () => void
}

const UpdateTask: FunctionComponent<UpdateTaskProps> = ({ task, project, isOpen, setIsOpen, onSuccess = () => { } }) => {
    const [title, setTitle] = useState(task ? task.title : null)
    const [description, setDescription] = useState(task ? task.description : null)
    const [assignee, setAssignee] = useState<DropdownOptionsType | null>(task ? { label: task.assignee?.name || "", value: task.assignee?.id || "" } : null)
    const [status, setStatus] = useState<DropdownOptionsType | null>(task ? { label: task.status || "", value: task.status || "" } : null)
    const [priority, setPriority] = useState<DropdownOptionsType | null>(task ? { label: task.priority || "", value: task.priority || "" } : null)

    const mutation = api.task.updateProperties.useMutation();

    const memberList: Array<DropdownOptionsType> = project?.members.map(member => ({ label: member.user.name, value: member.userId })) || []

    const clearState = () => {
        setTitle('')
        setDescription('')
        setAssignee(null)
        setStatus(null)
        setPriority(null)
    }

    const onSubmit = async () => {
        if (!project || !task)
            return

        const payload: UpdateTaskPayload = {
            title, description,
            taskId: task.id,
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

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description)
            setAssignee({ label: task.assignee?.name || "", value: task.assignee?.id || "" })
            setStatus({ label: task.status || "", value: task.status || "" })
            setPriority({ label: task.priority || "", value: task.priority || "" })
        }
    }, [task])

    return project && (
        <CustomModal title="Create Task" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="mt-2 flex flex-col gap-3">
                <Input style={{ width: "100%" }} value={title || ""} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input style={{ width: "100%" }} value={description || ""} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <Dropdown id="update-task-assignee" placeholder="Add Assignee" options={memberList} selected={assignee} onSelect={setAssignee} selectedLabel={selected => <UserWithAvatar name={selected?.label || ""} userId={selected?.value || ""} disableLink />} />
                <Dropdown id="update-task-status" options={STATUS_LIST_AS_OPTIONS} selected={status} onSelect={setStatus} selectedLabel={selected => <span>Status: <Badge variant={getStatusBadgeVariant()}>{selected?.value}</Badge></span>} />
                <Dropdown id="update-task-priority" options={PRIORITY_LIST_AS_OPTIONS} selected={priority} onSelect={setPriority} selectedLabel={selected => <span>Priority: <Badge variant={getPriorityBadgeVariant()}>{selected?.value}</Badge></span>} />
            </div>
            <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
                <Button onClick={onSubmit} variant="primary">Submit</Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
        </CustomModal>
    )
}


export default UpdateTask;