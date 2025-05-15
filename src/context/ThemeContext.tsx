import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface ThemeContextType {
  isDayMode: boolean;
  toggleTheme: () => void;
  themeValue: number;
  setThemeFromState: (state: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDayMode, setIsDayMode] = useState(false);

  const setThemeFromState = (state: string) => {
    setIsDayMode(state === "1");
  };

  const toggleTheme = () => {
    setIsDayMode(prev => !prev);
  };

  useEffect(() => {
    // Verificar el estado inicial del LED
    const checkInitialState = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/led/state');
        setThemeFromState(response.data.state);
      } catch (error) {
        console.error('Error al obtener el estado inicial:', error);
      }
    };

    // Configurar EventSource para escuchar actualizaciones
    const eventSource = new EventSource('http://localhost:3001/api/led/events');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setThemeFromState(data.state);
    };

    eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      eventSource.close();
    };

    checkInitialState();

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      isDayMode, 
      toggleTheme,
      themeValue: isDayMode ? 1 : 0,
      setThemeFromState
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