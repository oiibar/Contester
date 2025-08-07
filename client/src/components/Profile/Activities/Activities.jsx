import React from 'react';
import './Activities.scss'

const Activities = () => {
    return (
        <div className="profile-activity">
            <h2>Recent Activity</h2>
            <ul>
                <li>
                    <span className="activity-line green"></span>
                    <div className="activity-content">
                        <p className="activity-title">Solved "Two Sum"</p>
                        <p className="activity-time">2 hours ago</p>
                    </div>
                </li>
                <li>
                    <span className="activity-line blue"></span>
                    <div className="activity-content">
                        <p className="activity-title">Participated in Weekly Contest</p>
                        <p className="activity-time">1 day ago</p>
                    </div>
                </li>
                <li>
                    <span className="activity-line green"></span>
                    <div className="activity-content">
                        <p className="activity-title">Solved "Valid Parentheses"</p>
                        <p className="activity-time">2 days ago</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Activities;