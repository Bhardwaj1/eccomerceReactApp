import React from 'react';

const Button = ({ children, ...props }) => (
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    {...props}
  >
    {children}
  </button>
);

export default Button;
