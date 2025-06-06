// components/Loader.jsx
import React from 'react';
import { useTheme } from "@mui/material/styles";

const Loader = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div
        className={`w-16 h-16 border-4 rounded-full animate-spin ${
          isDarkMode
            ? 'border-white border-t-transparent'
            : 'border-black border-t-transparent'
        }`}
      ></div>
    </div>
  );
};

export default Loader;
