import { type FunctionComponent, useEffect, useState } from "react";
import Button from "../atomic/button";
import Input from "../atomic/input";
import { type RouterInputs, type RouterOutputs, api } from "~/utils/api";
import CustomModal from "./customModal";
import Dropdown, { type DropdownOptionsType } from "../derived/dropdown";
import { STATUS, STATUS_LIST_AS_OPTIONS, statusBadgeVariantConfig } from "~/utils/statusConstants";
import { PRIORITY, PRIORITY_LIST_AS_OPTIONS, priorityBadgeVariantConfig } from "~/utils/priorityConstants";
import Badge from "../atomic/badge";
import { UserWithAvatar } from "../atomic/userAvatar";
import { type Prisma } from "@prisma/client";
import TextArea from "../atomic/textArea";
import { notification } from "../atomic/notification";

type ProjectByIdOutput = RouterOutputs["project"]["getByAbbrv"];
type UpdateTaskPayload = RouterInputs["task"]["updateProperties"];
type TaskPayload = Prisma.TaskGetPayload<{ include: { assignee: true } }>;

type UpdateTaskProps = {
  task: TaskPayload | null;
  project?: ProjectByIdOutput;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: (data: TaskPayload) => void;
};

const UpdateTask: FunctionComponent<UpdateTaskProps> = ({ task, project, isOpen, setIsOpen, onSuccess = null }) => {
  // State for task properties
  const [title, setTitle] = useState(task ? task.title : null);
  const [description, setDescription] = useState(task ? task.description : null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<DropdownOptionsType | null>(null);
  const [status, setStatus] = useState<DropdownOptionsType | null>(null);
  const [priority, setPriority] = useState<DropdownOptionsType | null>(null);
  const [loading, setLoading] = useState(false);

  // Mutation hook for updating task properties
  const mutation = api.task.updateProperties.useMutation();

  // List of project members for the assignee dropdown
  const memberList: Array<DropdownOptionsType> = project?.members.map((member) => ({ label: member.user.name, value: member.userId })) ?? [];

  // Function to clear input fields
  const clearState = () => {
    setTitle("");
    setDescription("");
    setAssignee(null);
    setStatus(null);
    setPriority(null);
  };

  // Function to handle form submission
  const onSubmit = async () => {
    if (!project ?? !task) return;
    
    notification("Updating...", "info", "task-updating-msg")
    setLoading(true)

    // Parse start and end dates
    let _startDate = null;
    let _endDate = null;
    try {
      if (startDate) _startDate = new Date(startDate);
      if (endDate) _endDate = new Date(endDate);
    } catch {
      notification("Invalid start/end date.", "error", "task-date-failure-msg")
    }

    // Prepare payload for updating task properties
    const payload: UpdateTaskPayload = {
      title,
      description,
      taskId: task.id,
      status: status?.value ?? null,
      assigneeId: assignee?.value ?? null,
      priority: priority?.value ?? null,
      startDate: _startDate,
      endDate: _endDate,
    };

    if (assignee) payload.assigneeId = assignee.value;

    try {
      // Call the mutation to update task properties
      const res = await mutation.mutateAsync(payload);
      if (!res)
        notification("Failed to update task! Please try again.", "error", "task-update-failure-msg")
      // Close the modal
      setIsOpen && setIsOpen(false);
      // Trigger success callback if provided
      onSuccess && onSuccess(res);
    } catch (e) {
      // Handle errors
      notification("Failed to update task! Please try again.", "error", "task-update-failure-msg")
      console.log(e);
    }
    setLoading(false)
  };

  // Helper functions to get badge variants
  const getStatusBadgeVariant = () => {
    return statusBadgeVariantConfig[status?.value ?? STATUS.TODO];
  };

  const getPriorityBadgeVariant = () => {
    return priorityBadgeVariantConfig[priority?.value ?? PRIORITY.LOW];
  };

  // Clear state when modal is closed
  useEffect(() => {
    if (!isOpen) clearState();
  }, [isOpen]);

  // Set initial state when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignee({ label: task.assignee?.name ?? "", value: task.assignee?.id ?? "" });
      setStatus({ label: task.status ?? "", value: task.status ?? "" });
      setPriority({ label: task.priority ?? "", value: task.priority ?? "" });
      setStartDate(task && task.startDate ? task.startDate.toLocaleDateString() : null);
      setEndDate(task && task.endDate ? task.endDate.toLocaleDateString() : null);
    }
  }, [task]);

  return project && (
    <CustomModal title="Update Task" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mt-2 flex flex-col gap-3">
        {/* Input field for task title */}
        <Input style={{ width: "100%" }} value={title ?? ""} onChange={(e) => !loading && setTitle(e.target.value)} placeholder="Title" disabled={loading} />
        {/* Textarea for task description */}
        <TextArea style={{ width: "100%" }} value={description ?? ""} onChange={(e) => !loading && setDescription(e.target.value)} placeholder="Description" disabled={loading} />
        {/* Input field for task start date */}
        <Input style={{ width: "100%" }} value={startDate ?? ""} onChange={(e) => !loading && setStartDate(e.target.value)} placeholder="Start Date: MM/DD/YYYY" disabled={loading} />
        {/* Input field for task end date */}
        <Input style={{ width: "100%" }} value={endDate ?? ""} onChange={(e) => !loading && setEndDate(e.target.value)} placeholder="End Date: MM/DD/YYYY" disabled={loading} />
        {/* Dropdown for assigning a user */}
        <Dropdown id="update-task-assignee" placeholder="Add Assignee" options={memberList} selected={assignee} onSelect={setAssignee} selectedLabel={(selected) => <UserWithAvatar key={`UT-assignee-${selected?.value}`} name={selected?.label ?? ""} userId={selected?.value ?? ""} shade={selected?.shade} disableLink />} />
        {/* Dropdown for selecting task status */}
        <Dropdown id="update-task-status" options={STATUS_LIST_AS_OPTIONS} selected={status} onSelect={setStatus} selectedLabel={(selected) => <span>Status: <Badge key={`UT-badge-status-${selected?.value}`} variant={getStatusBadgeVariant()}>{selected?.value}</Badge></span>} />
        {/* Dropdown for selecting task priority */}
        <Dropdown id="update-task-priority" options={PRIORITY_LIST_AS_OPTIONS} selected={priority} onSelect={setPriority} selectedLabel={(selected) => <span>Priority: <Badge key={`UT-badge-priority-${selected?.value}`} variant={getPriorityBadgeVariant()}>{selected?.value}</Badge></span>} />
      </div>
      <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
        {/* Submit button */}
        <Button onClick={onSubmit} variant="primary" disabled={loading}>Submit</Button>
        {/* Cancel button */}
        <Button onClick={() => setIsOpen(false)} disabled={loading}>Cancel</Button>
      </div>
    </CustomModal>
  );
};

export default UpdateTask;
