import React from 'react';
import { useTheme } from '@mui/material/styles';

export const Input = ({ label, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          className={`text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      <input
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        {...props}
      />
    </div>
  );
};


