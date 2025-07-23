import React from "react";
import { useLocation } from "react-router";
import "./Code.scss";
import Problem from "components/Code/Problem/Problem";
import Discussion from "components/Code/Discussion/Discussion";
import CodeEditor from "components/Code/CodeEditor/CodeEditor";
import OutputDetails from "../../components/Code/CodeEditor/OutputDetails/OutputDetails";

const Code = () => {
  const location = useLocation();
  const contestData = location.state?.problem;
  const [response, setResponse] = React.useState({});

  if (!contestData) {
    return <p>No problem data available.</p>;
  }

  return (
      <div className="contest-page">
        <div className="top-section">
            <Problem contestData={contestData} />
        </div>
          <div className="code-section">
              <CodeEditor setResponse={setResponse} />
              <OutputDetails outputDetails={response} />
          </div>
        <Discussion />
      </div>
  );
};

export default Code;
