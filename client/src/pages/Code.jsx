import React from "react";
import "../styles/Code.css";
import MyButton from "../components/UI/MyButton/MyButton";

const contestData = {
  id: 1,
  name: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  startDate: "2024-12-01",
  endDate: "2024-12-07",
  status: "Upcoming",
};

const Code = () => {
  return (
    <div className="contest-page">
      <div className="problem-section">
        <div className="problem-header">
          <h1>1. {contestData.name}</h1>
        </div>
        <div className="problem-description">
          {contestData.description}
          <h2>Examples:</h2>
          <pre>Input: nums = [2,7,11,15], target = 9 Output: [0,1]</pre>
          <pre>Input: nums = [3,2,4], target = 6 Output: [1,2]</pre>
          <pre>Input: nums = [3,3], target = 6 Output: [0,1]</pre>
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
