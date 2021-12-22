import React from 'react';

interface ITextProps {
  className?: string;
}

const Text: React.FC<ITextProps> = ({ children, className }) => {
  return <p className={`mb-0 text-gray-700 dark:text-white-300 ${className}`}>{children}</p>;
};

export default Text;
