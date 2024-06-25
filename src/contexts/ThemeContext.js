import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import config from '../data/config.json';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const storedThemeName = localStorage.getItem('theme') || 'dark';
  const initialTheme = config.themes[storedThemeName];

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newThemeName = theme === config.themes.light ? 'dark' : 'light';
    setTheme(config.themes[newThemeName]);
    localStorage.setItem('theme', newThemeName);
  };

  useEffect(() => {
    const storedThemeName = localStorage.getItem('theme');
    if (storedThemeName) {
      setTheme(config.themes[storedThemeName]);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
