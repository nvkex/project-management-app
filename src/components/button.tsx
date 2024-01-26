import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: string
};

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <button className={`justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[hsl(280,13.34%,24.04%)] shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-teal-200 hover:bg-teal-200 hover:shadow-md`} {...props} />
        // <button className="rounded-md text-sm border-teal-200 border-2 bg-white px-3 py-2 shadow-sm font-semibold text-[hsl(280,13.34%,24.04%)] no-underline transition hover:bg-teal-200 hover:shadow-md" {...props} />
    )
}

export default Button;


