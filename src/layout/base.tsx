import Header from "~/components/header";
import { FunctionComponent } from "react";

type Props = {
    children: React.ReactNode;
}

const BaseLayout: FunctionComponent<Props> = ({ children }) => {
    return (
        <main className="bg-teal-50">
            <Header />
            <div className="container px-20 custom-container">
                <div className="container bg-white p-4 min-h-full shadow-md">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default BaseLayout;