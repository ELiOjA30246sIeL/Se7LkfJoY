// 代码生成时间: 2025-08-10 10:02:11
import React, { useState, createContext, useContext } from 'react';

// Define the theme context with default theme
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// ThemeProvider component that provides the theme and toggle function to its children
const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
const useTheme = () => useContext(ThemeContext);

// ThemeSwitcher component that allows the user to switch themes
const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// Main application component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Welcome to the Theme Switcher App</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
};

export default App;