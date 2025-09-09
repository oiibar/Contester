import { useEffect, useState } from 'react';
import { defineTheme } from 'utils/defineTheme';

const getInitialTheme = () => {
  const saved = localStorage.getItem('editor-theme');
  return saved ? JSON.parse(saved) : 'vs-dark';
};

const getInitialLanguage = () => {
  const saved = localStorage.getItem('editor-language');
  return saved
    ? JSON.parse(saved)
    : {
        id: 1,
        name: 'Java',
        label: 'Java',
        value: 'java',
        versions: [
          { name: 'JDK 1.8.0_66', index: 0 },
          { name: 'JDK 9.0.1', index: 1 },
          { name: 'JDK 10.0.1', index: 2 },
          { name: 'JDK 11.0.4', index: 3 },
          { name: 'JDK 17.0.1', index: 4 },
          { name: 'JDK 21.0.1', index: 5 },
        ],
      };
};

export const useCodeEditor = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    let active = true;
    defineTheme(theme).then(() => {
      if (active) console.log('Theme applied');
    });
    return () => {
      active = false;
    };
  }, [theme]);

  const handleThemeChange = (selectedOption) => {
    const selectedTheme = selectedOption.value;
    defineTheme(selectedTheme).then(() => {
      setTheme(selectedTheme);
      localStorage.setItem('editor-theme', JSON.stringify(selectedTheme));
    });
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
    localStorage.setItem('editor-language', JSON.stringify(selectedOption));
  };

  return {
    theme,
    language,
    handleThemeChange,
    handleLanguageChange,
  };
};
