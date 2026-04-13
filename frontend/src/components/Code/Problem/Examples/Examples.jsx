import React from "react";

const Examples = ({ examples }) => {
    return (
        <div className="examples">
            {examples?.map((example, index) => {
                return (
                    <div key={index}>
                        <pre>Input: {example.input}</pre>
                        <pre>Output: {example.output}</pre>
                    </div>
                );
            })}
        </div>
    );
};

export default Examples;
