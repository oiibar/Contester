import React from "react";
import './OutputDetails.scss';
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const OutputDetails = ({ contestData, outputDetails = [], processing }) => {
    const getValue = (value, transform = (v) => v) =>
        value ? transform(value) : "--";

    const getStatusClassName = (output, expected) => {
        try {
            const parsedOutput = JSON.parse(output);
            const parsedExpected = JSON.parse(expected);
            const isEqual = JSON.stringify(parsedOutput) === JSON.stringify(parsedExpected);
            return isEqual ? "status_circle complete" : "status_circle failed";
        } catch {
            return output?.trim() === expected?.trim()
                ? "status_circle complete"
                : "status_circle neutral"; // fallback to neutral if not matched or missing
        }
    };

    const renderStatusIcon = (output, expected) => {
        try {
            const parsedOutput = JSON.parse(output);
            const parsedExpected = JSON.parse(expected);
            const isEqual = JSON.stringify(parsedOutput) === JSON.stringify(parsedExpected);
            return isEqual ? <MdDone color="white" /> : <RxCross2 color="white" />;
        } catch {
            return output?.trim() === expected?.trim()
                ? <MdDone color="white" />
                : null; // don't show anything if it fails
        }
    };

    return (
        <div className="outputDetails">
            <div className="testcases">
                {contestData.examples?.map((example, index) => {
                    const outputDetail = outputDetails[index]; // result from execution

                    const statusClass = outputDetail
                        ? getStatusClassName(outputDetail.output, outputDetail.expected)
                        : "status_circle neutral";

                    return (
                        <div className="testcase" key={index}>
                            <div className="testcase-header">
                                <div className={statusClass}>
                                    {outputDetail && renderStatusIcon(outputDetail.output, outputDetail.expected)}
                                </div>
                                <div>Testcase {index + 1}</div>
                            </div>
                            <div>
                                <p>Input: {example.input}</p>
                                <p>Expected Output: {example.output}</p>
                                <p className="testcase_details">
                                    Time: {getValue(outputDetail?.time, (v) => v * 1000)}ms |
                                    Memory: {getValue(outputDetail?.memory, (v) => Math.round(v / 1024))}MB
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="console_output">
                <h3>Console Output:</h3>
                <div className="output-box">
                    <pre className="output-pre">
                        {outputDetails.length > 0
                            ? outputDetails.map((res, idx) => (
                                <React.Fragment key={idx}>
                                    {res.output}
                                    <br />
                                </React.Fragment>
                            ))
                            : "--"}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default OutputDetails;
