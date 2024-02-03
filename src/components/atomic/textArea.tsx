import { type ComponentPropsWithoutRef, type FunctionComponent } from "react";

type InputProps = ComponentPropsWithoutRef<'textarea'> & {
    classes?: string
};

const TextArea: FunctionComponent<InputProps> = (props) => {
    return (
        <textarea rows={4} className={`peer h-20 rounded-md bg-gray-50 px-4 py-2 font-normal outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-1 focus:ring-teal-200 ${props.classes ? props.classes : ''}`} {...props} />
    )
}

export default TextArea;