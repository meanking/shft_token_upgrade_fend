import { ReactComponent as DarkModeIcon } from 'assets/images/svgs/Moon-Stars-Icon.svg';
import { ReactComponent as LightModeIcon } from 'assets/images/svgs/Sun-Fog-Icon.svg';
import React, { useState } from 'react';

import styles from './ThemeToggle.module.scss';

interface IThmemeToggleProps {
  label?: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const ThemeToggle: React.FC<IThmemeToggleProps> = ({
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
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            checked={toggleValue}
            onChange={handleChange}
            className="sr-only"
          />
          <div className="w-10 h-4 rounded-full shadow-inner bg-white-0 dark:bg-gray-400" />
          <div
            className={`${
              toggleValue ? styles.toggle_active : ''
            } bg-white-0 dark:bg-gray-400 absolute border border-gray-200 w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition flex justify-center items-center`}>
            {toggleValue ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </div>
        <div className="ml-3 font-medium text-gray-700">{label}</div>
      </label>
    </div>
  );
};

export default ThemeToggle;
