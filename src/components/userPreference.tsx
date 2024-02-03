import { type FunctionComponent, useEffect, useState } from 'react';
import { ClipboardDocumentCheckIcon, ClipboardIcon, FaceFrownIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, BuildingOfficeIcon, EnvelopeIcon, HeartIcon, MapPinIcon, PaintBrushIcon } from '@heroicons/react/20/solid';

import Badge from '~/components/badge';
import Button from '~/components/button';
import Input from '~/components/input';
import PageHead from '~/components/pageHead';
import { UserWithAvatar } from '~/components/userAvatar';
import { type RouterInputs, api, type RouterOutputs } from '~/utils/api';
import { priorityBadgeVariantConfig } from '~/utils/priorityConstants';
import { STATUS_ENUM, statusBadgeVariantConfig } from '~/utils/statusConstants';
import Link from 'next/link';

// Type definitions
type UserDetailsOutput = RouterOutputs["user"]["getDetailedUserData"];
type UserPrefUpdateInput = RouterInputs["user"]["updateUserProfile"]

type ColumnPropType = {
    col?: number
    children?: React.ReactNode,
    header?: React.ReactNode,

}

const Column: FunctionComponent<ColumnPropType> = ({ col = 100, children, header }) => {
    return (
        <div className={`relative p-4 shadow-sm ring-1 ring-gray-200 rounded-md`} style={{ height: "78vh", width: col + "%" }}>
            {header}
            <div className="relative overflow-y-auto overflow-x-hidden p-1" style={{ height: "94%" }}>
                {children}
            </div>
        </div>
    )
}

function UserPreferences(props: { data: UserDetailsOutput, blockEdit?: boolean }) {
    const { data, blockEdit = true } = props;

    const [hasValuesChanged, setHasValuesChanged] = useState(false)
    const [name, setName] = useState(data?.name)
    const [department, setDepartment] = useState(data?.department)
    const [organization, setOrganization] = useState(data?.organization)
    const [location, setLocation] = useState(data?.location)
    const [shade, setShade] = useState(data?.shade)

    const mutation = api.user.updateUserProfile.useMutation();

    const updateNullOnEmpty = (value: string | null, callback: (value: any) => void) => {
        if (!value || value.length == 0) {
            value = null
        }
        callback(value)
    }

    const updatePreferences = async () => {
        if (!hasValuesChanged)
            return
        const payload: UserPrefUpdateInput = {
            name, department, organization, location, shade
        }
        try {
            mutation.mutate(payload)
            setHasValuesChanged(false)
        }
        catch (e) {
            alert("Error!")
            console.log(e)
        }
    }

    useEffect(() => {
        if (
            data && (
                data.name != name ||
                data.department != department ||
                data.organization != organization ||
                data.location != location ||
                data.shade != shade
            )
        )
            setHasValuesChanged(true)
        else
            setHasValuesChanged(false)
    }, [data, name, department, organization, location, shade])

    return (
        <>
            <div className="flex justify-between align-middle">
                <PageHead>User Preferences</PageHead>
                <div>
                    <UserWithAvatar userId={data?.id ?? ''} name={data?.name ?? ''} shade={data?.shade} disableLink />
                </div>
            </div>
            <div className="pt-6 flex gap-4 justify-between h-full">
                <Column col={30} header={<div className='text-xs text-gray-500 font-medium uppercase pb-1'>About</div>}>
                    <div className='flex gap-4 mt-4 mb-6'>
                        <HeartIcon width={20} className='text-teal-500' />
                        <Input value={name ?? ""} onChange={(e) => updateNullOnEmpty(e.target.value, setName)} classes='w-full hover:bg-gray-200' disabled={blockEdit} />
                    </div>
                    <div className='flex gap-4 my-6'>
                        <BriefcaseIcon width={20} className='text-teal-500' />
                        <Input value={department ?? ""} onChange={(e) => updateNullOnEmpty(e.target.value, setDepartment)} classes='w-full hover:bg-gray-200' placeholder={blockEdit ? 'No Department Info' : 'Your Department'} disabled={blockEdit} />
                    </div>
                    <div className='flex gap-4 my-6'>
                        <BuildingOfficeIcon width={20} className='text-teal-500' />
                        <Input value={organization ?? ""} onChange={(e) => updateNullOnEmpty(e.target.value, setOrganization)} classes='w-full hover:bg-gray-200' placeholder={blockEdit ? 'No Organization Info' : 'Your Organization'} disabled={blockEdit} />
                    </div>
                    <div className='flex gap-4 my-6'>
                        <MapPinIcon width={20} className='text-teal-500' />
                        <Input value={location ?? ""} onChange={(e) => updateNullOnEmpty(e.target.value, setLocation)} classes='w-full hover:bg-gray-200' placeholder={blockEdit ? 'No Location Info' : 'Your Location'} disabled={blockEdit} />
                    </div>
                    <div className='flex gap-4 my-6'>
                        <PaintBrushIcon width={20} className='text-teal-500' />
                        <Input value={shade ?? ""} onChange={(e) => updateNullOnEmpty(e.target.value, setShade)} classes='w-full hover:bg-gray-200' placeholder={blockEdit ? 'No Shade Info' : 'Profile Shade'} disabled={blockEdit} />
                    </div>
                    <div className='text-xs text-gray-500 font-medium uppercase'>Contact</div>
                    <div className='flex gap-4 mt-6 mb-4'>
                        <EnvelopeIcon width={20} className='text-teal-500' />
                        <Input value={data?.email ?? ""} classes='w-full' placeholder='Email' disabled />
                    </div>
                    {!blockEdit && <div className="float-right">
                        <Button variant='primary' onClick={updatePreferences} disabled={!hasValuesChanged}>Save</Button>
                    </div>}
                </Column>
                <Column col={70} header={<div className='text-xs text-gray-500 font-medium uppercase pb-1'>Worked ON</div>}>
                    <div>
                        {
                            data && data.assignedTasks.length == 0 && (
                                <div className="w-full text-gray-400">
                                    <FaceFrownIcon width={50} className='text-gray-200 m-auto py-2'/>
                                    <div className='text-sm text-center py-2'>Looks like you haven&apos;t started working on anything yet. It&apos;s the perfect time to create some tasks and start making a difference.</div>
                                    <div className='text-center py-2'><Link href="/projects"><Button>Projects</Button></Link></div>
                                </div>
                            )
                        }
                        {
                            data && data.assignedTasks.map((task, ti) => (
                                <div key={`user-task-list-${ti}`} className='bg-gray-50 my-4 p-4 rounded-md hover:shadow-md'>
                                    <div className='flex gap-2'>
                                        {
                                            task.status != STATUS_ENUM.DONE.valueOf() ? <ClipboardIcon width={18} className='text-teal-500' /> :
                                                <ClipboardDocumentCheckIcon width={18} className='text-teal-500' />
                                        }
                                        <span>{task.title}</span>
                                    </div>
                                    <div className='text-gray-700'>
                                        <div className='text-xs p-1'>{task.description}</div>
                                        <div className='text-xs p-1 flex gap-2'>
                                            <Badge variant='tertiary'>{task.ticketId}</Badge>
                                            <span className='font-bold'>·</span>
                                            <Badge variant={priorityBadgeVariantConfig[task.priority]}>{task.priority}</Badge>
                                            <span className='font-bold'>·</span>
                                            <Badge variant={statusBadgeVariantConfig[task.status]}>{task.status}</Badge>
                                        </div>
                                        <div className='text-xs p-1'>
                                            <span className='font-medium'>Deadline: </span><span className={task.endDate ? 'text-red-600 font-medium' : ''}>{task.endDate ? task.endDate.toDateString().slice(4) : 'Not Set'}</span>
                                            <span className='px-4 font-bold'>·</span>
                                            <span className='font-medium'>Started On: </span><span className={task.startDate ? 'text-sky-600 font-medium' : ''}>{task.startDate ? task.startDate.toDateString().slice(4) : 'Not Set'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Column>
            </div>
        </>

    );
}

export default UserPreferences