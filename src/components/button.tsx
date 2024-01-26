import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <button className="rounded-md text-sm border-teal-200 border-2 bg-white px-3 py-2 shadow-sm font-semibold text-[hsl(280,13.34%,24.04%)] no-underline transition hover:bg-teal-200 hover:shadow-md" {...props} />
    )
}

export default Button;


