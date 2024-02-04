/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import Link from "next/link";
import { type FunctionComponent } from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type UserAvatarProps = {
  name: string;
  shade?: string;
};

type UserWithAvatarProps = {
  name: string;
  userId: string;
  disableLink?: boolean;
  shade?: string;
};

const AVATAR_BG_CONFIG: { [key: string]: ClassNameValue } = {
  slate: 'bg-slate-700',
  gray: 'bg-gray-700',
  zinc: 'bg-zinc-700',
  neutral: 'bg-neutral-700',
  stone: 'bg-stone-700',
  red: 'bg-red-700',
  orange: 'bg-orange-700',
  amber: 'bg-amber-700',
  yellow: 'bg-yellow-700',
  lime: 'bg-lime-700',
  green: 'bg-green-700',
  emerald: 'bg-emerald-700',
  teal: 'bg-teal-700',
  cyan: 'bg-cyan-700',
  sky: 'bg-sky-700',
  blue: 'bg-blue-700',
  indigo: 'bg-indigo-700',
  violet: 'bg-violet-700',
  purple: 'bg-purple-700',
  fuchsia: 'bg-fuchsia-700',
  pink: 'bg-pink-700',
  rose: 'bg-rose-700',
};

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ name, shade = 'teal' }) => {
  // Merge Tailwind classes
  const classNames = twMerge(
    "rounded-full text-white flex justify-center align-middle",
    AVATAR_BG_CONFIG[shade]
  );

  // Extract initials from the name
  const initials = name
    .trim()
    .split(" ")
    .map(s => s[0])
    .reduce((a, b = "") => a + b);

  return (
    <span className={classNames} style={{ padding: "2px", width: "25px", height: "25px" }}>
      <small>{initials}</small>
    </span>
  );
};

const UserWithAvatar: FunctionComponent<UserWithAvatarProps> = ({ name, userId, shade = 'teal', disableLink = false }) => {
  return (
    <div className="flex gap-1 align-middle">
      {/* UserAvatar component */}
      <UserAvatar name={name} shade={shade} />

      {/* Display either a simple div or a link based on the disableLink prop */}
      {disableLink ? (
        <div className="text-[hsl(280,13.34%,24.04%)]">{name}</div>
      ) : (
        <Link href={`/profile/${userId}`} onClick={(e) => e.stopPropagation()} className="text-teal-800 hover:text-teal-600 hover:underline">
          {name}
        </Link>
      )}
    </div>
  );
};

export { UserAvatar, UserWithAvatar };
