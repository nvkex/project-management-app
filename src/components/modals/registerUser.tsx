import { type FunctionComponent, useEffect, useState } from "react";
import Button from "../atomic/button";
import Input from "../atomic/input";
import { type RouterInputs, api } from "~/utils/api";
import CustomModal from "./customModal";

type CreateUserPayload = RouterInputs["user"]["create"];

type RegisterUserProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: () => void;
};

const RegisterUser: FunctionComponent<RegisterUserProps> = ({ isOpen, setIsOpen, onSuccess = () => null }) => {
  // State for user input
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  // Mutation hook for creating a new user
  const mutation = api.user.create.useMutation();

  // Function to clear input fields
  const clearState = () => {
    setName(null);
    setEmail(null);
    setPassword(null);
  };

  // Function to handle form submission
  const onSubmit = () => {
    // Check if all fields are filled
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    // Prepare payload for creating a new user
    const payload: CreateUserPayload = {
      name,
      email,
      password,
    };

    try {
      // Call the mutation to create a new user
      mutation.mutate(payload);

      // Close the modal
      setIsOpen && setIsOpen(false);

      // Trigger success callback if provided
      onSuccess && onSuccess();
    } catch (e) {
      // Handle errors
      alert("Error");
      console.log(e);
    }
  };

  // Clear state when modal is closed
  useEffect(() => {
    if (!isOpen) clearState();
  }, [isOpen]);

  return (
    <CustomModal title="Register" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mt-2 flex flex-col gap-3">
        {/* Input field for full name */}
        <Input style={{ width: "100%" }} value={name ?? ''} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        {/* Input field for email */}
        <Input style={{ width: "100%" }} value={email ?? ''} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        {/* Input field for password */}
        <Input style={{ width: "100%" }} value={password ?? ''} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
      <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
        {/* Submit button */}
        <Button onClick={onSubmit} variant="primary">
          Submit
        </Button>
        {/* Cancel button */}
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </div>
    </CustomModal>
  );
};

export default RegisterUser;
