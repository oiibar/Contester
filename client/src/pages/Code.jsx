import React from "react";
import { useLocation } from "react-router";
import "../styles/Code.css";
import MyButton from "../components/UI/MyButton/MyButton";

const Code = () => {
  const location = useLocation();
  const contestData = location.state?.problem;

  if (!contestData) {
    return <p>No problem data available.</p>;
  }

  const toggleHint = (index) => {
    const hintContent = document.getElementById(`hint-content-${index}`);
    const button = document.getElementById(`hint-button-${index}`);

    if (hintContent.style.display === "block") {
      hintContent.style.display = "none";
      button.innerHTML = `Hint ${index + 1}`;
    } else {
      hintContent.style.display = "block";
      button.innerHTML = "Close Hint";
    }
  };

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
              const parsedExample = JSON.parse(example);
              return (
                  <div key={index}>
                    <pre>Input: {parsedExample.input}</pre>
                    <pre>Output: {parsedExample.output}</pre>
                  </div>
              );
            })}

            {/* Render dropdowns for hints */}
            {contestData.hint ? <><h3 style={{"margin-top": "30px"}}>Hints:</h3>
                {contestData.hints.map((hint, index) => (
                      <div key={index} className="hint-dropdown">
                        <button
                            id={`hint-button-${index}`}
                            className="hint-button"
                            onClick={() => toggleHint(index)}
                        >
                          Hint {index + 1}
                        </button>
                        <div
                            id={`hint-content-${index}`}
                            className="hint-content"
                            style={{ display: "none" }} // Initially hidden
                        >
                          <p>{hint}</p>
                        </div>
                      </div>
                  ))}</> :
                <h3 style={{"margin-top": "30px"}}>No hints)</h3>
                }

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
