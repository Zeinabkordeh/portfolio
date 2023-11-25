import { createContext, useContext, ReactNode, useState } from 'react';

// Define the type for the theme
type Theme = {
  primaryColor: string;
  secondaryColor: string;
};

// Define the context with default values
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
} | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#E7E7E7',
    secondaryColor: '#597A72',
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
