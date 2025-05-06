import React from 'react';
import './CodeEditor.scss';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import LanguageOptionDropdown from './LanguagesDropdown/LanguageOptionDropdown';
import { useCodeEditor } from 'hooks/code/useCodeEditor';

const CodeEditor = () => {
    const {
        theme,
        language,
        handleThemeChange,
        handleLanguageChange,
    } = useCodeEditor();

    return (
        <div className="editor-section">
            <div className="editor-dropdowns">
                <ThemeDropdown
                    handleThemeChange={handleThemeChange}
                    theme={theme}
                />
                <LanguageOptionDropdown
                    handleLanguageChange={handleLanguageChange}
                    language={language}
                />
            </div>
            <Editor
                height="100%"
                language={language}
                defaultValue="// Write your code here"
                theme={theme}
                options={{
                    fontSize: 16,
                    fontFamily: "Fira Code, Consolas, monospace",
                    automaticLayout: true,
                    wordWrap: "on",
                    minimap: { enabled: true },
                    lineNumbers: "on",
                    scrollBeyondLastLine: true,
                    padding: { top: 10, bottom: 10 },
                    tabSize: 2,
                    formatOnType: true,
                    formatOnPaste: true,
                    cursorStyle: "line",
                    renderWhitespace: "none",
                }}
            />
        </div>
    );
};

export default CodeEditor;
