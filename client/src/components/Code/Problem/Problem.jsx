import React from "react";
import Examples from "./Examples/Examples";
import Hints from "./Hints/Hints";
import "./Problem.scss";

const Problem = ({ contestData }) => {
    if (!contestData) {
        return <p>No problem data available.</p>;
    }

    return (
        <div className="problem-section">
            <h1 className="problem-header">1. {contestData.title}</h1>
            <div className="problem-description">
                <p>{contestData.given}. Function name MUST be {contestData.functionName}</p>

                <h2>Examples:</h2>
                <Examples examples={contestData.examples} />

                <h3>Hints:</h3>
                <Hints hints={contestData.hints} />
            </div>
        </div>
    );
};

export default Problem;
