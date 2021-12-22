import React, { useState } from 'react';

import styles from './Toggle.module.scss';

interface IToggleProps {
  label?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Toggle: React.FC<IToggleProps> = ({
  label = '',
  checked = false,
  onChange,
  className = '',
}) => {
  const [toggleValue, setToggleValue] = useState(checked || false);

  const handleChange = () => {
    onChange(!toggleValue);
    setToggleValue(!toggleValue);
  };

  return (
    <div className={className}>
      <label htmlFor="toogleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleB"
            type="checkbox"
            checked={toggleValue}
            onChange={handleChange}
            className="sr-only"
          />
          <div className="w-10 h-4 rounded-full shadow-inner bg-black-600 dark:bg-black-600" />
          <div
            className={`${
              toggleValue ? styles.toggle_active : ''
            } border border-gray-200 bg-maroon-200 dark:bg-maroon-100 absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition`}
          />
        </div>
        <div className="ml-3 font-medium text-gray-700 dark:text-white-300">{label}</div>
      </label>
    </div>
  );
};

export default Toggle;
