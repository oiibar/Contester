import React from "react";

const OutputDetails = ({ outputDetails }) => {
    const getValue = (value, transform = (v) => v) =>
        value ? transform(value) : "--";

    return (
        <div className="output-box">
            <p>
                Status Code: <span>{getValue(outputDetails.statusCode)}</span>
            </p>
            <p>
                Memory: <span>{getValue(outputDetails.memory, (v) => `${Math.round(v / 1024)}MB`)}</span>
            </p>
            <p>
                Time: <span>{getValue(outputDetails.cpuTime, (v) => `${v}s`)}</span>
            </p>
            <p>
                Console Output: <span>{getValue(outputDetails.output)}</span>
            </p>
        </div>
    );
};

export default OutputDetails;
