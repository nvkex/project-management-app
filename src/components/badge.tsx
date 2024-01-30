import { FunctionComponent } from "react";

type BadgeProps = {
    children: React.ReactNode,
    variant?: string,
}

const Badge: FunctionComponent<BadgeProps> = ({ children, variant = 'muted' }) => {
    let bg = 'bg-gray-200'
    let text = "text-gray-800"
    switch (variant) {
        case "primary":
            bg = "bg-teal-100"
            text = "text-teal-800"
            break;
        case "secondary":
            bg = "bg-indigo-100"
            text = "text-indigo-800"
            break;
        case "success":
            bg = "bg-sky-200"
            text = "text-sky-800"
            break;
        case "warning":
            bg = "bg-amber-200"
            text = "text-amber-800"
            break;
        case "danger":
            bg = "bg-red-200"
            text = "text-red-800"
            break;
    }

    return (
        <span className={`${bg} ${text} rounded-[3px] text-xs px-1 font-medium`}>
            {children}
        </span>
    )
}


export default Badge;