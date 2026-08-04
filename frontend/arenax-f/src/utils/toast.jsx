import toast from "react-hot-toast";

export const showSuccess = (msg) => {
    toast.success(msg);
};

export const showError = (error) => {

    const message =
        error?.response?.data?.msg ||
        error?.message ||
        "Something went wrong";

    toast.error(message);
};