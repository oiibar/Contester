import React, {useRef, useState} from 'react';
import './CodeEditor.scss';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import axios from 'axios';
import LanguageOptionDropdown from './LanguagesDropdown/LanguageOptionDropdown';
import { useCodeEditor } from 'hooks/code/useCodeEditor';
import MyButton from "components/UI/MyButton/MyButton";
import {getToken, setToken} from "utils/localStorage.helper.ts";

const CodeEditor = ({setResponse}) => {
    const {
        theme,
        language,
        handleThemeChange,
        handleLanguageChange,
    } = useCodeEditor();
    const editorRef = useRef(null);
    const [processing, setProcessing] = useState(false);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        editorRef.current.focus();
        editorRef.current.setValue(getToken("code"));
    }

    const handleCompile = async () => {
        setProcessing(true);
        const code = editorRef.current.getValue();
        setToken("code", editorRef.current.getValue());

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/execute",
                {
                    script: code,
                    stdin: "",
                    language: language.value,
                    versionIndex: 6,
                    compileOnly: false,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setResponse(response.data);
            console.log("Backend Response:", response.data);
        } catch (error) {
            console.error("Backend Error:", error);
        } finally {
            setProcessing(false);
        }

    };

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
                <MyButton disabled={processing} onClick={handleCompile}>Run</MyButton>
                <MyButton>Submit</MyButton>
            </div>
            {
                processing ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <Editor
                        height="100%"
                        language={language}
                        onMount={handleEditorDidMount}
                        defaultValue={"//Comment"}
                        theme={theme}
                        options={{
                            fontSize: 16,
                            fontFamily: "Fira Code, Consolas, monospace",
                            automaticLayout: true,
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
                )
            }
        </div>
    );
};

export default CodeEditor;
