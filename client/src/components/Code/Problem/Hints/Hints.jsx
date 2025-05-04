import React, { useState } from "react";

const Hints = ({ hints }) => {
    const [visibleHintIndex, setVisibleHintIndex] = useState(null);

    const handleHintClick = (index) => {
        setVisibleHintIndex(visibleHintIndex === index ? null : index);
    };

    return (
        <>
            {hints.map((hint, index) => (
                <div key={index} className="hint-dropdown">
                    <button
                        className="hint-button"
                        onClick={() => handleHintClick(index)}
                    >
                        Hint {index + 1}
                    </button>
                    {visibleHintIndex === index && (
                        <div className="hint-content">
                            <p>{hint}</p>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default Hints;
