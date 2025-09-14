import React from 'react';
import './CodeEditor.scss';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import LanguageOptionDropdown from './LanguagesDropdown/LanguageOptionDropdown';
import { useCodeEditor } from 'hooks/code/useCodeEditor';
import { useCodeExecution } from 'hooks/code/useCodeExecution';
import MyButton from 'components/UI/MyButton/MyButton';

const CodeEditor = ({
  contestData,
  setResponse,
  processing,
  setProcessing,
}) => {
  const { theme, language, handleThemeChange, handleLanguageChange } =
    useCodeEditor();

  const { editorRef, handleEditorDidMount, handleCompile, handleSubmit } =
    useCodeExecution(contestData, setResponse, setProcessing);

  return (
    <div className="editor-section">
      <div className="editor-dropdowns">
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        <LanguageOptionDropdown
          handleLanguageChange={handleLanguageChange}
          language={language}
        />
        <MyButton disabled={processing} onClick={() => handleCompile(language)}>
          Run
        </MyButton>
        <MyButton disabled={processing} onClick={() => handleSubmit(language)}>
          Submit
        </MyButton>
      </div>

      {processing ? (
        <p className="loading">Running code...</p>
      ) : (
        <Editor
          height="100%"
          language={language.value}
          onMount={handleEditorDidMount}
          defaultValue={'//Comment'}
          theme={theme}
          options={{
            fontSize: 16,
            fontFamily: 'Fira Code, Consolas, monospace',
            automaticLayout: true,
            lineNumbers: 'on',
            scrollBeyondLastLine: true,
            padding: { top: 10, bottom: 10 },
            tabSize: 2,
            formatOnType: true,
            formatOnPaste: true,
            cursorStyle: 'line',
            renderWhitespace: 'none',
          }}
        />
      )}
    </div>
  );
};

export default CodeEditor;
