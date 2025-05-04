import React from "react";
import { useLocation } from "react-router";
import "./Problems.scss";
import Header from "../../components/Problems/Header/Header";
import ProblemsList from "../../components/Problems/ProblemsList/ProblemsList";
import Details from "../../components/Problems/Details/Details";
import {updateContest} from "../../api/api";

const Problems = () => {
    const location = useLocation();
    const contestData = location.state?.contest || {};

    return (
        <>
            <div className="contest-container">
                <Header contestData={contestData} updateContest={updateContest} />
            </div>
            <div className="contest-container">
                <ProblemsList contestData={contestData} updateContest={updateContest} />
            </div>
            <div className="contest-container">
                <Details contestData={contestData} updateContest={updateContest} />
            </div>
        </>
    );
};

export default Problems;
