import React from 'react';
import './Past.scss'
import { formatDate } from "utils/dateUtils";
import useContestDurations from "hooks/contests/useContestDurations";

const Past = ({ contests, isLoading, error }) => {
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
            <p>No past contests</p>
        )
    }

    return (
        <div className="section">
            <h2 className="section-title">Past Contests</h2>
            {contests.length === 0 ? (
                <p>No past contests</p>
            ) : (
                <table className="contests-table">
                    <thead>
                    <tr>
                        <th>Contest Name</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Participants</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contests.map((contest) => (
                        <tr key={contest.id}>
                            <td>{contest.title}</td>
                            <td>{formatDate(contest.endDate)}</td>
                            <td>{durations[contest.id] || "---"}</td>
                            <td>{contest.participants}</td>
                            <td>
                                <a className="view-results-btn">View Results</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Past;
