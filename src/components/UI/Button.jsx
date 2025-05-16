import React from "react";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";

const Button = ({ children, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md transition-colors duration-300 font-semibold border",
        isDark
          ? "border-gray-300 bg-gray-100 text-gray-900"
          : "border-transparent bg-gray-900 text-gray-100"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
