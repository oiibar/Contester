import React, { useRef } from 'react';
import './CodeEditor.scss';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import LanguageOptionDropdown from './LanguagesDropdown/LanguageOptionDropdown';
import { useCodeEditor } from 'hooks/code/useCodeEditor';
import MyButton from 'components/UI/MyButton/MyButton';
import { getToken, setToken } from 'utils/localStorage.helper.js';

const CodeEditor = ({
  contestData,
  setResponse,
  processing,
  setProcessing,
}) => {
  const { theme, language, handleThemeChange, handleLanguageChange } =
    useCodeEditor();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editorRef.current.focus();
    editorRef.current.setValue(getToken('code'));
  }

  const handleCompile = async () => {
    setProcessing(true);
    const userCode = editorRef.current.getValue();
    setToken('code', userCode);

    const examples = contestData.examples || [];
    const results = [];

    for (const example of examples) {
      const input = example.input;

      const wrappedCode = `
            ${userCode}
            const result = ${contestData.functionName}(...${input});
            console.log(result);
        `;

      try {
        const response = await fetch('http://localhost:8080/api/v1/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            script: wrappedCode,
            stdin: example.input,
            language: language.value,
            versionIndex: language.versions[language.versions.length - 1].index,
            compileOnly: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        results.push({
          input: example.input,
          output: data.output,
          expected: example.output,
          time: data.cpuTime,
          memory: data.memory,
          status: data.statusCode,
        });
      } catch (err) {
        results.push({
          input: example.input,
          error: err.message || 'Error',
        });
      }
    }

    setResponse(results);
    console.log(results, contestData);
    setProcessing(false);
  };

  return (
    <div className="editor-section">
      <div className="editor-dropdowns">
        <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        <LanguageOptionDropdown
          handleLanguageChange={handleLanguageChange}
          language={language}
        />
        <MyButton disabled={processing} onClick={handleCompile}>
          Run
        </MyButton>
        <MyButton>Submit</MyButton>
      </div>
      {processing ? (
        <p className="loading">Running code...</p>
      ) : (
        <Editor
          height="100%"
          language={language}
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
