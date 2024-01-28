import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type InputProps = ComponentPropsWithoutRef<'input'> & {
    classes?: string
};

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <input className={`peer h-10 rounded-md bg-gray-50 px-4 font-normal outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-1 focus:ring-teal-200 ${props.classes ? props.classes : ''}`} {...props} />
    )
}

export default Input;