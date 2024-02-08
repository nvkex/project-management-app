import { type FunctionComponent, useEffect, useState } from "react";
import Button from "../atomic/button";
import Input from "../atomic/input";
import { type RouterOutputs, api } from "~/utils/api";
import CustomModal from "./customModal";
import TextArea from "../atomic/textArea";
import { notification } from "../atomic/notification";

type CreateUserResponse = RouterOutputs["project"]["create"];

type CreateProjectProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: (data: CreateUserResponse) => void;
};

const CreateProject: FunctionComponent<CreateProjectProps> = ({ isOpen, setIsOpen, onSuccess = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const mutation = api.project.create.useMutation();

  const onSubmit = async () => {
    const formData = {
      title,
      description,
      abbreviation,
    };
    try {
      const res = await mutation.mutateAsync(formData, {
        onError: (error) => {
          notification("Failed to create project! Please try again.", "error", "project-create-failure-msg")
          console.log(error)
        }
      });
      onSuccess && onSuccess(res);
      setIsOpen(false)
    } catch (e) {
      notification("Failed to create project! Please try again.", "error", "project-create-failure-msg")
      console.error(e);
    }
  };

  const clearState = () => {
    setTitle('');
    setDescription('');
    setAbbreviation('');
  };

  useEffect(() => {
    if (!isOpen) clearState();
  }, [isOpen]);

  return (
    <CustomModal title="Create Project" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mt-2 flex flex-col gap-3">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Abbreviation"
          value={abbreviation}
          onChange={(e) => setAbbreviation(e.target.value)}
        />
      </div>
      <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
        <Button onClick={onSubmit} variant="primary">
          Submit
        </Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </div>
    </CustomModal>
  );
};

export default CreateProject;
