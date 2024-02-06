import { toast, Bounce, type ToastOptions } from "react-toastify";

const NOTIFICATION_TYPE = {
    success: "success",
    info: "info"
}

type NotificationType = keyof typeof NOTIFICATION_TYPE | null;

const notification = (message: string, type: NotificationType = "info", id: string | null = null) => {
    let notifyer = toast.info
    
    if (type === NOTIFICATION_TYPE.success)
        notifyer = toast.success

    const toastConfig: ToastOptions<unknown> = {
        progress: undefined,
        transition: Bounce,
    }

    // Using an id can prevent sending duplicate notifications
    if (id)
        toastConfig.toastId = id

    notifyer(message, toastConfig);
}

export {
    notification,
    NOTIFICATION_TYPE
}