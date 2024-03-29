/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {

    const onLogout = async () => {
        await signOut({redirect: true, callbackUrl: "/"})
    }

    return (
        <header className="bg-white border-b-2">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-5" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">PMA</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link href="/dashboard" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Dashboard</Link>
                    <Link href="/projects" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Projects</Link>
                    <Link href="/profile" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Profile</Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" onClick={onLogout} className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Log out <span aria-hidden="true">&rarr;</span></a>
                </div>
            </nav>
            <div className="lg:hidden" role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-10"></div>
                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">PMA</span>
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </a>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link href="/tasks" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Dashboard</Link>
                                <Link href="/projects" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Projects</Link>
                                <Link href="/profile" className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Profile</Link>
                            </div>
                            <div className="py-6">
                                <Link href="#" onClick={onLogout} className="text-sm font-semibold leading-6 text-[hsl(280,13.34%,24.04%)] hover:text-teal-700">Log out <span aria-hidden="true">&rarr;</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}