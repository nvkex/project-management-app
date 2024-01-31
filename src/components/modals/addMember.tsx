import { FunctionComponent, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import { api } from "~/utils/api";
import CustomModal from "./customModal";
import Dropdown, { DropdownOptionsType } from "../dropdown";
import { UserWithAvatar } from "../userAvatar";

type AddMemberProps = {
    projectId?: string,
    onSuccess?: () => void
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

const AddMember: FunctionComponent<AddMemberProps> = ({ projectId = '', isOpen, setIsOpen, onSuccess = () => { } }) => {
    const [userEmail, setUserEmail] = useState('')
    const [addedUserIds, setAddedUserIds] = useState<Array<DropdownOptionsType> | []>([])
    const [userIdSet, setUserIdSet] = useState(new Set())

    const mutation = api.project.addMember.useMutation();
    const { data: rawUserData = [] } = api.user.getUsersNotInProject.useQuery({ projectId });
    const userData = rawUserData.map(user => ({ label: user.name, value: user.id }))

    const hideDialog = () => { setIsOpen(false) }

    const clearState = () => {
        setUserEmail('')
        setAddedUserIds([])
    }

    const onAddUser = (data: DropdownOptionsType[]) => {
        const uniqUsers = data.filter(d => {
            if (userIdSet.has(d.value))
                return false
            userIdSet.add(d.value)
            return true
        })
        setAddedUserIds(t => [...t, ...uniqUsers])
    }

    const onSubmit = async () => {
        // const res = await mutation.mutate({ projectId, userIds: addedUserIds.map(user => user.value) });
        alert("Added!")
        onSuccess && onSuccess()
        hideDialog()
    }

    useEffect(() => {
        if (!isOpen)
            clearState()
    }, [isOpen])

    return (
        <CustomModal title="Add Member" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="mt-2 flex flex-col gap-3">
                <div className="text-xs text-gray-400">Selected Users:</div>
                <div className="py-1 px-2 bg-slate-200 rounded-md">
                    {
                        addedUserIds.length == 0 && <span className="text-gray-400 px-1">No users selected</span>
                    }
                    {
                        addedUserIds.map(user => (<div className="my-2">
                            <UserWithAvatar name={user.label || ""} userId={user.value || ""} shade={user.shade} disableLink />
                        </div>))
                    }
                </div>
                <Dropdown id="add-member" multiple options={userData} onSelect={onAddUser} selectedLabel={selected => ""} selected={[]} placeholder="Select Users" />
            </div>
            <div className="mt-6 gap-2 sm:flex sm:flex-row-reverse">
                <Button onClick={onSubmit} variant="primary">Submit</Button>
                <Button onClick={hideDialog}>Cancel</Button>
            </div>
        </CustomModal>
    )
}


export default AddMember;