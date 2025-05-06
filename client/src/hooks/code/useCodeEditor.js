import { useEffect, useState } from 'react';
import { defineTheme } from 'utils/defineTheme';

const getInitialTheme = () => {
    const saved = localStorage.getItem('editor-theme');
    return saved ? JSON.parse(saved) : 'vs-dark';
};

const getInitialLanguage = () => {
    const saved = localStorage.getItem('editor-language');
    return saved ? JSON.parse(saved) : 'js';
};

export const useCodeEditor = () => {
    const [theme, setTheme] = useState(getInitialTheme);
    const [language, setLanguage] = useState(getInitialLanguage);

    useEffect(() => {
        defineTheme(theme);
    }, [theme]);

    const handleThemeChange = (selectedOption) => {
        const selectedTheme = selectedOption.value;
        defineTheme(selectedTheme).then(() => {
            setTheme(selectedTheme);
            localStorage.setItem('editor-theme', JSON.stringify(selectedTheme));
        });
    };

    const handleLanguageChange = (selectedOption) => {
        const selectedLang = selectedOption.value;
        setLanguage(selectedLang);
        localStorage.setItem('editor-language', JSON.stringify(selectedLang));
    };

    return {
        theme,
        language,
        handleThemeChange,
        handleLanguageChange,
    };
};
