import React from "react";
import { useTheme } from "@mui/material/styles";

const Modal = ({ isOpen, onClose, headerContent, children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${
        isDark
          ? "backdrop-blur-sm bg-black/60"
          : "backdrop-blur-sm bg-gray-900/30"
      }`}
    >
      <div
        className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-lg flex flex-col ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
        style={{
          maxHeight: "90vh",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex-1 text-center font-semibold">{headerContent}</div>
          <button
            onClick={onClose}
            className={`ml-auto p-2 px-4 rounded-full text-sm focus:outline-none transition
              ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }
            `}
            aria-label="Cancel modal"
            type="button"
          >
            X
          </button>
        </div>
        <div
          className="px-4 pb-4"
          style={{
            overflowY: "auto",
            maxHeight: "calc(90vh - 56px)", 
            scrollbarWidth: "none", 
            msOverflowStyle: "none", 
          }}
        >
          <style>
            {`
              /* Chrome, Safari and Edge */
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
