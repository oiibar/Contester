import React from 'react';
import MyButton from "../../UI/MyButton/MyButton.jsx";
import './Ongoing.scss'
import { formatDate } from "utils/dateUtils";
import useContestDurations from "hooks/contests/useContestDurations";

const Ongoing = ({ contests, navigateToProblems, isLoading, error }) => {
    const durations = useContestDurations(contests);

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    if(error) {
        return (
            <p>Error loading contests</p>
        )
    }
    if(contests.length === 0) {
        return (
            <p>No ongoing contests</p>
        )
    }

    return (
        <div className="section">
            <h2 className="section-title">Ongoing Contests</h2>
            {contests.length === 0 ? (
                <p>No ongoing contests</p>
            ) : (
                contests.map((contest) => (
                    <div key={contest.id} className="contest-row">
                        <div className="contest-col">
                            <h3 className="contest-name">{contest.title}</h3>
                            <p className="contest-dates">{formatDate(contest.endDate)}</p>
                            <p className="contest-dates">Duration: {durations[contest.id] || "---"}</p>
                        </div>
                        <MyButton className="register-btn" onClick={() => navigateToProblems(contest)}>
                            Register
                        </MyButton>
                    </div>
                ))
            )}
        </div>
    );
};

export default Ongoing;
