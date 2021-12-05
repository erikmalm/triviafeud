import { toast } from "react-toastify"

/**
 * Using React Toastify for noticiations:
 * https://fkhadra.github.io/react-toastify/introduction
 *
 * @param {*} message
 * @returns
 */

export const notifySuccess = (message = "Success") => toast.success(message)
export const notifyWarning = (message = "Warning") => toast.warning(message)
export const notifyError = (message = "Error") => toast.error(message)
