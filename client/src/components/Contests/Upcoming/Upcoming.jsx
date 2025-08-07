import React from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import './Upcoming.scss'
import { formatDate } from "utils/dateUtils";
import useContestDurations from "hooks/contests/useContestDurations";
import { useAuth } from "hooks/auth/AuthProvider";

const Upcoming = ({ contests, navigateToProblems, isLoading, error }) => {
    const durations = useContestDurations(contests);
    const { user } = useAuth();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading contests</p>;
    if (contests.length === 0) return null;

    return (
        <div className="section">
            <h2 className="section-title">Upcoming Contests</h2>
            {contests.map((contest) => {
                const isRegistered = contest.participants?.some(p => p.id === user?.id);
                const buttonStyle = !isRegistered ? "register" : "";

                return (
                    <div key={contest.id} className="contest-row">
                        <div className="contest-col">
                            <h3 className="contest-name">{contest.title}</h3>
                            <p className="contest-dates">{formatDate(contest.endDate)}</p>
                            <p className="contest-dates">Duration: {durations[contest.id] || "---"}</p>
                        </div>
                        <MyButton className={buttonStyle} onClick={() => navigateToProblems(contest)}>
                            {isRegistered ? "Continue" : "Register"}
                        </MyButton>
                    </div>
                );
            })}
        </div>
    );
};

export default Upcoming;
