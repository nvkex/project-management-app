const STATUS = {
    TODO: "TODO",
    IN_PROGRESS: "IN PROGRESS",
    DONE: "DONE"
}

enum STATUS_ENUM {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE"
}

const STATUS_LIST = Object.values(STATUS)
const STATUS_LIST_AS_OPTIONS = Object.values(STATUS).map(status => ({ label: status, value: status }))

const statusBadgeVariantConfig = {
    [STATUS.TODO]: "muted",
    [STATUS.IN_PROGRESS]: "primary",
    [STATUS.DONE]: "success"
}

export { STATUS, STATUS_LIST, STATUS_LIST_AS_OPTIONS, statusBadgeVariantConfig, STATUS_ENUM }