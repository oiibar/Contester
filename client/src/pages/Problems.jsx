import React from "react";
import { useLocation, useNavigate } from "react-router";
import "../styles/Problems.css";
import MyButton from "../components/UI/MyButton/MyButton";
import { IoArrowBack } from "react-icons/io5";

const Problems = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const problemsData = location.state?.tasks || [];

    const goBack = () => {
        navigate(-1);
    };

    const startProblem = (problem) => {
        navigate("/code", { state: { problem } });
    };

    return (
        <div className="problems-container">
            <h1 className="problems-title">Problems List</h1>
            <MyButton onClick={goBack} className="back-button">
                <IoArrowBack />
                <span>Back to Contests</span>
            </MyButton>

            {problemsData.length > 0 ? (
                <div className="problems-table-container">
                    <table className="problems-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Problem Name</th>
                            <th>Description</th>
                            <th>Difficulty</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {problemsData.map((problem, index) => (
                            <tr key={problem.id}>
                                <td>{index + 1}</td>
                                <td>{problem.title}</td>
                                <td>{problem.description}</td>
                                <td>
                                    <span
                                        className={`problem-difficulty ${problem.difficulty?.toLowerCase()}`}
                                    >
                                      {problem.difficulty || "N/A"}
                                    </span>
                                </td>

                                <td>
                                    <MyButton onClick={() => startProblem(problem)}>Start</MyButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No problems available for this contest.</p>
            )}
        </div>
    );
};

export default Problems;
