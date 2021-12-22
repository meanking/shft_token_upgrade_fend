import React, { useState } from 'react';

export type TMode = 'dark' | 'light';

interface IThemeContextState {
  mode: TMode;
  toggleTheme: () => void;
  setTheme: (mode: TMode) => void;
}

const contextDefaultValues: IThemeContextState = {
  mode: 'light',
  toggleTheme: () => undefined,
  setTheme: () => undefined,
};

export const ThemeContext = React.createContext<IThemeContextState>(contextDefaultValues);

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setTheme] = useState<TMode>('light');
  const toggleTheme = () => setTheme(mode === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
