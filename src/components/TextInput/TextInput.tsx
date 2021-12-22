import React from 'react';

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      className="w-full py-1 mb-6 font-bold text-gray-700 text-indigo-700 placeholder-gray-700 bg-transparent border-b-2 border-indigo-500 outline-none dark:text-white-300 dark:placeholder-white-300"
      {...props}
    />
  );
};

export default TextInput;
