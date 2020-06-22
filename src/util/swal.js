import Swal from "sweetalert2";

export default {
    error: (message) => {
        return Swal.fire({
            icon: "error",
            text: message
        });
    },
    errorWithTitle: (title, message) => {
        return Swal.fire({
            icon: "error",
            title: title,
            text: message
        });
    },
    success: (message) => {
        return Swal.fire({
            icon: "success",
            text: message
        })
    },
    successWithTitle: (title, message) => {
        return Swal.fire({
            icon: "success",
            title: title,
            text: message
        })
    },
    deleteConfirm: () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "Please type 'remove' if you want to remove",
            input: 'text',
            inputPlaceholder: "remove",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Remove",
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
    },
    doubleCheck: (message) => {
        return Swal.fire({
            title: "Are you sure?",
            text: message,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
    }
}