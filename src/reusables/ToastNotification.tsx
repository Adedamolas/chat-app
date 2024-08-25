import React from "react";
import Toastify from "toastify-js";

type ToastNotificationProps = {
  message: string;
  duration: number;
  backgroundColor: string;
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  duration,
  backgroundColor,
}) => {
  const showNotification = () => {
    Toastify({
      text: message,
      duration: duration,
      close: true,
      gravity: "top",
      position: "center",
      backgroundColor: backgroundColor,
      style: {
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
        opacity: "0.95",
      },
    }).showToast();
  };

  React.useEffect(() => {
    showNotification();
  }, []);

  return null;
};

export default ToastNotification;
