import React, { useEffect, useState } from "react";
import "./Toast.css"; // Create a CSS file for styling

const Toast = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message) => {
    localStorage.setItem("toastMessage", message);
  };

  useEffect(() => {
    setIsVisible(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`toast-container ${isVisible ? "visible" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
