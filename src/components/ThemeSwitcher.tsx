import React from 'react';
import { useTheme } from '../utils/themeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handlePrimaryColorChange = (color: string) => {
    setTheme((prevTheme) => ({ ...prevTheme, primaryColor: color }));
  };

  const handleSecondaryColorChange = (color: string) => {
    setTheme((prevTheme) => ({ ...prevTheme, secondaryColor: color }));
  };

  return (
    <div>
      <label>Light Color:</label>
      <input
        type="color"
        value={theme.primaryColor}
        onChange={(e) => handlePrimaryColorChange(e.target.value)}
      />

      <label>Dark color:</label>
      <input
        type="color"
        value={theme.secondaryColor}
        onChange={(e) => handleSecondaryColorChange(e.target.value)}
      />
    </div>
  );
};

export default ThemeSwitcher;
