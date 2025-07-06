import React, {useRef, useState} from 'react';
import './CodeEditor.scss';
import { Editor } from '@monaco-editor/react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import axios from 'axios';
import LanguageOptionDropdown from './LanguagesDropdown/LanguageOptionDropdown';
import { useCodeEditor } from 'hooks/code/useCodeEditor';
import MyButton from "../../UI/MyButton/MyButton";

const CodeEditor = () => {
    const {
        theme,
        language,
        handleThemeChange,
        handleLanguageChange,
    } = useCodeEditor();

    const editorRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [outputDetails, setOutputDetails] = useState(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const handleCompile = async () => {
        setProcessing(true);
        const code = editorRef.current.getValue();

        const formData = {
            clientId: "1d286c424ad067c1f3ad915968f1e092",
            clientSecret: "eb50e3393380c971c5da388e2531886855e4960f3c0c6fc13674a6f169bac200",
            script: code,
            stdin: "",
            language: language.value,
            versionIndex: 6,
            compileOnly: false
        };

        const options = {
            method: "POST",
            url: "https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute",
            headers: {
                "Content-Type": "application/json",
            },
            data: formData,
        };

        try {
            const response = await axios.request(options);
            console.log("JDoodle Response:", response.data);
        } catch (error) {
            console.error("JDoodle Error:", error);
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
                <MyButton onClick={handleCompile}>Run</MyButton>
                <MyButton>Submit</MyButton>
            </div>
            <Editor
                height="100%"
                language={language}
                onMount={handleEditorDidMount}
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
