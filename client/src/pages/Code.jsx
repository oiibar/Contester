import React from "react";
import { useLocation } from "react-router";
import "../styles/Code.css";
import MyButton from "../components/UI/MyButton/MyButton";

const Code = () => {
  const location = useLocation();
  const contestData = location.state?.problem;  // Access the passed problem data

  if (!contestData) {
    return <p>No problem data available.</p>;
  }

  return (
      <div className="contest-page">
        <div className="problem-section">
          <div className="problem-header">
            <h1>1. {contestData.title}</h1>
          </div>
          <div className="problem-description">
            <p>{contestData.given}</p>
            <h2>Examples:</h2>
            {contestData.examples?.map((example, index) => {
              const parsedExample = JSON.parse(example);  // Parse the JSON string into an object
              return (
                  <div key={index}>
                    <pre>Input: {parsedExample.input}</pre>
                    <pre>Output: {parsedExample.output}</pre>
                  </div>
              );
            })}
          </div>
        </div>

        <div className="editor-section">
          <div className="code-editor">
            <div className="header">
              <h2>Code Editor</h2>
              <MyButton>Run Code</MyButton>
            </div>
            <textarea
                placeholder="// Write your code here"
                className="code-area"
            ></textarea>
          </div>
          <div className="execution-section">
            <h3>Output:</h3>
            <pre className="output-box">Your output will appear here</pre>
          </div>
        </div>
      </div>
  );
};

export default Code;
