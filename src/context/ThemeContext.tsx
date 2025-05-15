import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDayMode: boolean;
  toggleTheme: () => void;
  themeValue: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDayMode, setIsDayMode] = useState(false);

  const toggleTheme = () => {
    setIsDayMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDayMode, 
      toggleTheme,
      themeValue: isDayMode ? 1 : 0,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};