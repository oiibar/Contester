import { useRef, useState } from 'react';
import { getToken, setToken } from 'utils/localStorage.helper.js';
import { useAuth } from 'auth/AuthContext';

export const useCodeExecution = (contestData, setResponse, setProcessing) => {
  const editorRef = useRef(null);
  const { user } = useAuth();
  const [results, setResults] = useState([]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
    editorRef.current.setValue(getToken('code'));
  };

  const handleCompile = async (language) => {
    setProcessing(true);
    const userCode = editorRef.current.getValue();
    setToken('code', userCode);

    const examples = contestData.examples || [];
    let newResults = [];

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

        newResults.push({
          input: example.input,
          output: data.output,
          expected: example.output,
          time: data.cpuTime,
          memory: data.memory,
          status: data.statusCode,
        });
      } catch (err) {
        newResults.push({
          input: example.input,
          error: err.message || 'Error',
        });
      }
    }

    setResults(newResults);
    setResponse(newResults);
    setProcessing(false);
  };

  const handleSubmit = (language) => {
    console.log({
      userId: user.id,
      problemId: contestData.id,
      code: getToken('code'),
      language: language.value,
      result: results,
    });
  };

  return {
    editorRef,
    results,
    handleEditorDidMount,
    handleCompile,
    handleSubmit,
  };
};
