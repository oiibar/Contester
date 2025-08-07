import React from 'react';
import './Header.scss';
import { formatDate } from "utils/dateUtils";
import RegisterButton from "./RegisterButton";

const Header = ({ isRegistered, contestData, setContestData }) => {
    return (
        <div className="contest-header">
            <div>
                <h1 className="contest-title">{contestData.title || "Contest Title"}</h1>
                <p className="contest-time">
                    {formatDate(contestData.endDate)
                        ? `Ends: ${formatDate(contestData.endDate)}`
                        : "No end date"}
                </p>
            </div>

            <RegisterButton isRegistered={isRegistered} contestData={contestData} setContestData={setContestData} />
        </div>
    );
};

export default Header;
