import { FunctionComponent } from "react";

type Props = {
    children: React.ReactNode;
}

const PageHead: FunctionComponent<Props> = ({ children }) => {
    return (
        <h3 className="h-full text-5xl font-medium tracking-tight text-white sm:text-[1.5rem] border-teal-500 border-l-4 pl-3 py-1 flex align-middle">
            <span className="text-[hsl(280,13.34%,24.04%)]">{children}</span>
        </h3>
    )
}

export default PageHead;