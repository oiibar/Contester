import React, {useState} from 'react';
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

    const [code, setCode] = useState('//comment');
    const [processing, setProcessing] = useState(false);
    const [outputDetails, setOutputDetails] = useState(null);

    const onChange = (action, data) => {
        setCode(data);
    };

    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
        };
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        // axios
        //     .request(options)
        //     .then(function (response) {
        //         console.log("res.data", response.data);
        //         const token = response.data.token;
        //         checkStatus(token);
        //     })
        //     .catch((err) => {
        //         let error = err.response ? err.response.data : err;
        //         setProcessing(false);
        //         console.log(error);
        //     });

        console.log(formData);
    };
    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return
            } else {
                setProcessing(false)
                setOutputDetails(response.data)
                console.log('response.data', response.data)
                return
            }
        } catch (err) {
            console.log("err", err);
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
                onChange={onChange}
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
