import { type FunctionComponent } from "react";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { type TRPCClientErrorLike } from "@trpc/client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

import Header from "~/components/sections/header";

type Props = {
    children: React.ReactNode;
    apiDependency?: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>
}

const BaseLayout: FunctionComponent<Props> = ({ children, apiDependency }) => {
    if (apiDependency?.status === 'loading') {
        return <main className="bg-teal-50">
            <Header />
            <div className="container px-20 custom-container mx-auto">
                <div className="container bg-white text-gray-300 p-4 min-h-full min-w-full shadow-md text-center text-4xl animate-pulse">
                    Loading...
                </div>
            </div>
        </main>
    }
    else if (apiDependency?.status === 'error') {
        return <main className="bg-teal-50">
            <Header />
            <div className="container px-20 custom-container mx-auto">
                <div className="container bg-white text-gray-500 p-4 min-h-full min-w-full shadow-md text-center text-lg">
                    <div className="flex gap-2 justify-center align-middle">
                        <ExclamationCircleIcon width={30} />
                        <div>Oops! Something went wrong</div>
                    </div>
                </div>
            </div>
        </main>
    }

    return (
        <main className="bg-teal-50">
            <Header />
            <div className="container px-20 custom-container mx-auto">
                <div className="container bg-white p-4 min-h-full shadow-md">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default BaseLayout;