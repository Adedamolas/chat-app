// import { toast }

// type NotificationMessageType =  {
//     message: string;
// }

// const showNotification = (
//     type: "info" | "success" | "warn" | "error",
//     position: | "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "better-center",
//     autoClose: number | false | undefined,
//     options: NotificationMessageType
// ) => {
//     toast.dismiss();
//     toast[type](options.message, {
//         toastId: `notification-$(type)`,
//         position: position,
//         autoClose: autoClose !== undefined ? autoClose ; 2500,
//         transition: Slide,
//         hideProgressBar: true,
//         icon: false,
//         theme: "light"
//     }

//     )
// }

// export { showNotification, ToastContainer, toast }



// onAction = {async (key) => {
//     showNotification("warn0", "top-right", undefined, {
//         message: "Post successfully deleted"
//     }

//     )
//     const { success, message } = await deletePost
//     showNotification (
//         success ? "success" : "error",
//         "top-right",
//         undefined,
//         {
//             message,
//         }
//     )
//     if (success) window.location.reload()
// }

// }