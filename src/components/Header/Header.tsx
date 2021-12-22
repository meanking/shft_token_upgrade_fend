import React, { useContext } from 'react';
import ConnectButton from 'components/Buttons/ConnectButton';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import { ThemeContext } from 'providers/ThemeProvider';
import { ReactComponent as LightShyftNetworkLogo } from 'assets/images/svgs/light-shyft-logo.svg';
import { ReactComponent as DarkShyftNetworkLogo } from 'assets/images/svgs/dark-shyft-logo.svg';

const Header: React.FC = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const handleChange = () => {
    toggleTheme();
  };

  return (
    <div className="w-full px-6 py-10 bg-transparent flex justify-between items-center">
      <div>
        {mode === 'light' ? (
          <LightShyftNetworkLogo />
        ) : (
          <DarkShyftNetworkLogo />
        )}
      </div>
      <div className="flex items-center justify-end">
        <ThemeToggle onChange={handleChange} />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
