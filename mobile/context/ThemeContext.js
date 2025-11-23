import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEMES } from '../constants/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('ocean');
  const [theme, setTheme] = useState(THEMES.ocean);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme && THEMES[storedTheme]) {
        setThemeName(storedTheme);
        setTheme(THEMES[storedTheme]);
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeTheme = async (newThemeName) => {
    if (THEMES[newThemeName]) {
      setThemeName(newThemeName);
      setTheme(THEMES[newThemeName]);
      try {
        await AsyncStorage.setItem('appTheme', newThemeName);
      } catch (error) {
        console.error('Failed to save theme', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, changeTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
