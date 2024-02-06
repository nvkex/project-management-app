import { toast, Bounce } from "react-toastify";

const NOTIFICATION_TYPE = {
    success: "success",
    info: "info"
}

type NotificationType = keyof typeof NOTIFICATION_TYPE | null;

const notification = (message: string, type: NotificationType="info") => {
    let notifyer = toast.info
    if (type === NOTIFICATION_TYPE.success)
        notifyer = toast.success

    notifyer(message, {
        progress: undefined,
        transition: Bounce,
    });
}

export {
    notification,
    NOTIFICATION_TYPE
}