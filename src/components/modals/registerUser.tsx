import { type FunctionComponent, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import { type RouterInputs, api } from "~/utils/api";
import CustomModal from "./customModal";

type CreateUserPayload = RouterInputs["user"]["create"]

type RegisterUserProps = {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    onSuccess?: () => void
}

const RegisterUser: FunctionComponent<RegisterUserProps> = ({ isOpen, setIsOpen, onSuccess = () => null }) => {
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const mutation = api.user.create.useMutation();

    const clearState = () => {
        setName(null)
        setEmail(null)
        setPassword(null)
    }

    const onSubmit = async () => {
        if(!name || !email || !password){
            alert("All fields required!")
            return
        }
        const payload: CreateUserPayload = {
            name, email, password
        }

        try {
            mutation.mutate(payload)
            onSuccess && onSuccess()
            setIsOpen && setIsOpen(false)
        }
        catch (e) {
            alert("Error")
            console.log(e)
        }
    }

    useEffect(() => {
        if (!isOpen)
            clearState()
    }, [isOpen])

    return (
        <CustomModal title="Register" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="mt-2 flex flex-col gap-3">
                <Input style={{ width: "100%" }} value={name ?? ''} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <Input style={{ width: "100%" }} value={email ?? ''} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input style={{ width: "100%" }} value={password ?? ''} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </div>
            <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
                <Button onClick={onSubmit} variant="primary">Submit</Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
        </CustomModal>
    )
}


export default RegisterUser;