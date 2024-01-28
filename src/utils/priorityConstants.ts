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

const PRIORITY_LIST = Object.values(PRIORITY)
const PRIORITY_LIST_AS_OPTIONS = Object.values(PRIORITY).map(status => ({ label: status, value: status }))

const priorityBadgeVariantConfig = {
    [PRIORITY.LOW]: "secondary",
    [PRIORITY.MEDIUM]: "warning",
    [PRIORITY.HIGH]: "danger"
}

export { PRIORITY, PRIORITY_LIST, PRIORITY_LIST_AS_OPTIONS, priorityBadgeVariantConfig, PRIORITY_ENUM }