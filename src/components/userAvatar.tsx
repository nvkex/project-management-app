import Link from "next/link";
import { FunctionComponent } from "react";

type UserAvatarProps = {
    name: string
}

type UserWithAvatarProps = {
    name: string,
    userId: string,
    disableLink?: boolean
}

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ name }) => {
    const initials = name.split(" ")
        .map(s => s[0])
        .reduce((a, b = "") => a + b)
    return (
        <span className="rounded-full bg-teal-700 text-white flex justify-center align-middle" style={{ padding: "2px", width: "25px", height: "25px" }}><small>{initials}</small></span>
    )
}

const UserWithAvatar: FunctionComponent<UserWithAvatarProps> = ({ name, userId, disableLink = false }) => {
    return (
        <div className="flex gap-1 align-middle">
            <UserAvatar name={name} />
            {
                disableLink ? (
                    <div className="text-[hsl(280,13.34%,24.04%)]">{name}</div>
                ) : (
                    <Link href={`/user/${userId}`} className="text-teal-800 hover:text-teal-600 hover:underline">{name}</Link>
                )
            }

        </div>
    )
}

export { UserAvatar, UserWithAvatar };