import React from "react";
import { useLocation } from "react-router";
import "./Code.scss";
import Problem from "../../components/Code/Problem/Problem";
import Discussion from "../../components/Code/Discussion/Discussion";
import CodeEditor from "../../components/Code/CodeEditor/CodeEditor";

const Code = () => {
  const location = useLocation();
  const contestData = location.state?.problem;

  if (!contestData) {
    return <p>No problem data available.</p>;
  }

  return (
      <div className="contest-page">
        <div className="top-section">
            <Problem contestData={contestData} />
            <CodeEditor />
        </div>
        <Discussion />
      </div>
  );
};

export default Code;
