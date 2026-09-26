import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'theme-peach' | 'theme-lavender' | 'theme-aqua';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('patient-theme');
    return (savedTheme as Theme) || 'theme-peach';
  });

  useEffect(() => {
    localStorage.setItem('patient-theme', theme);
    document.body.classList.remove('theme-peach', 'theme-lavender', 'theme-aqua');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
