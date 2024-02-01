
import { Bars2Icon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const PRIORITY = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH"
}

enum PRIORITY_ENUM {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

const shadeByPriorityType = {
    [PRIORITY_ENUM.LOW.valueOf()] : 'indigo',
    [PRIORITY_ENUM.MEDIUM.valueOf()] : 'amber',
    [PRIORITY_ENUM.HIGH.valueOf()] : 'red'
}

const PRIORITY_ICON = {
    [PRIORITY_ENUM.LOW.valueOf()] : ChevronDownIcon,
    [PRIORITY_ENUM.MEDIUM.valueOf()] : Bars2Icon,
    [PRIORITY_ENUM.HIGH.valueOf()] : ChevronUpIcon
}

const PRIORITY_LIST = Object.values(PRIORITY)
const PRIORITY_LIST_AS_OPTIONS = Object.values(PRIORITY).map(status => ({ label: status, value: status }))

const priorityBadgeVariantConfig = {
    [PRIORITY.LOW]: "secondary",
    [PRIORITY.MEDIUM]: "warning",
    [PRIORITY.HIGH]: "danger"
}

export { PRIORITY, PRIORITY_LIST, PRIORITY_LIST_AS_OPTIONS, priorityBadgeVariantConfig, PRIORITY_ENUM, PRIORITY_ICON, shadeByPriorityType }