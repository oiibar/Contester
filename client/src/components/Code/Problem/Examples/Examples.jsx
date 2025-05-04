import React from "react";

const Examples = ({ examples }) => {
    return (
        <div className="examples">
            {examples?.map((example, index) => {
                const parsedExample = JSON.parse(example);
                return (
                    <div key={index}>
                        <pre>Input: {parsedExample.input}</pre>
                        <pre>Output: {parsedExample.output}</pre>
                    </div>
                );
            })}
        </div>
    );
};

export default Examples;
