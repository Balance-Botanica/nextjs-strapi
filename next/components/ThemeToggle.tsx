'use client';

import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900"
      aria-label={`Toggle ${themeMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {themeMode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}; 