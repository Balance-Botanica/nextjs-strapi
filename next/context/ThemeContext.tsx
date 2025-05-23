'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, theme } from '../lib/design-system/theme';

type ThemeContextType = {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  currentTheme: ReturnType<typeof theme>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  
  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setThemeMode(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{
      themeMode,
      toggleTheme,
      currentTheme: theme(themeMode)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 