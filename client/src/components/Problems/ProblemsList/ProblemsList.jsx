import React from 'react';
import './ProblemsList.scss';
import { useNavigate } from "react-router";
import ProblemCard from 'components/Problems/ProblemsList/ProblemCard/ProblemCard';

const ProblemsList = ({ contestData, isRegistered }) => {
    const navigate = useNavigate();

    const handleStartClick = (problem) => {
        navigate('/code', { state: { problem } });
    };

    const sortedProblems = contestData.problems.sort((a, b) => {
        const difficultyOrder = { EASY: 0, MEDIUM: 1, HARD: 2 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    return (
        <div className="problems-section">
            <h2 className="section-title">Problems</h2>
            <div className="problems-list">
                {sortedProblems.map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        problem={problem}
                        onStartClick={handleStartClick}
                        isRegistered={isRegistered}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProblemsList;
