import { useRef, useState, useEffect } from 'react';
import { getToken, setToken } from 'shared/lib/localStorage.helper.js';
import { useAuth } from 'auth/AuthContext';
import { submitProblem } from 'api/api.js';
import { useFetching } from '../fetching/useFetching';
import problem from '../../components/Code/Problem/Problem';

export const useCodeExecution = (
  contestData,
  setResponse,
  setProcessing,
  setRun,
  setSubmitted,
  setCompleted
) => {
  const editorRef = useRef(null);
  const { user } = useAuth();
  const { token } = useAuth();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const alreadySolved = user?.problems?.some((p) => p.id === contestData.id);
    if (alreadySolved) {
      setCompleted(true);
    }
  }, [user, contestData.id, setCompleted]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editorRef.current.focus();
    editorRef.current.setValue(getToken('code'));
  };

  const handleCompile = async (language) => {
    setProcessing(true);
    setRun(false);
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
    setRun(true);
  };

  const {
    fetching: handleSubmit,
    isLoading,
    error,
  } = useFetching(async (language) => {
    setSubmitted(false);
    try {
      const submissionData = {
        userId: user.id,
        problemId: contestData.id,
        code: getToken('code'),
        language: language.value,
        results: results,
      };
      await submitProblem(submissionData, token);
    } catch (e) {
      throw new Error('You are already submitted this problem.');
    }
    setSubmitted(true);
    alert('Submitted successfully!');
  });

  return {
    editorRef,
    results,
    handleEditorDidMount,
    handleCompile,
    handleSubmit,
    isLoading,
    error,
  };
};
