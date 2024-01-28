import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: string
};

const Button: FunctionComponent<ButtonProps> = (props) => {
    
    let classes = 'hover:ring-gray-200 hover:bg-gray-200'
    if(props.variant)
        switch (props.variant) {
            case "primary":
                classes = "hover:ring-teal-200 hover:bg-teal-200"
                break;
            case "success":
                classes = "hover:ring-sky-200 hover:bg-sky-200"
                break;
            case "warning":
                classes = "hover:ring-yellow-200 hover:bg-yellow-200"
                break;
            case "danger":
                classes = "hover:ring-red-200 hover:bg-red-200"
                break;
        }

    return (
        <button className={`${classes} bg-white text-[hsl(280,13.34%,24.04%)] justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-gray-300 ring-inset hover:shadow-md`} {...props} />
        // <button className="rounded-md text-sm border-teal-200 border-2 bg-white px-3 py-2 shadow-sm font-semibold text-[hsl(280,13.34%,24.04%)] no-underline transition hover:bg-teal-200 hover:shadow-md" {...props} />
    )
}

export default Button;


