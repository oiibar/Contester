import React, { useState } from "react";
import "./Table.scss";
import LeaderboardRow from "./LeaderboardRow";
import Filters from "../Filters/Filters";

const Table = ({ users }) => {
    const [filter, setFilter] = useState({
        sortBy: "rating-asc",
        filterCountry: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getFilteredAndSortedUsers = () => {
        let filteredUsers = [...users];

        if (filter.filterCountry) {
            filteredUsers = filteredUsers.filter(
                (user) => user.country === filter.filterCountry
            );
        }

        switch (filter.sortBy) {
            case "rating-asc":
                filteredUsers.sort((a, b) => a.rating - b.rating);
                break;
            case "rating-desc":
                filteredUsers.sort((a, b) => b.rating - a.rating);
                break;
            case "problems-asc":
                filteredUsers.sort((a, b) => a.problemsSolved - b.problemsSolved);
                break;
            case "problems-desc":
                filteredUsers.sort((a, b) => b.problemsSolved - a.problemsSolved);
                break;
            case "username-asc":
                filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
                break;
            case "username-desc":
                filteredUsers.sort((a, b) => b.username.localeCompare(a.username));
                break;
            default:
                break;
        }

        return filteredUsers;
    };

    const rankedUsers = getFilteredAndSortedUsers().map((user, index) => ({
        ...user,
        rank: index + 1,
    }));

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />
            <table className="leaderboard-table">
                <thead>
                <tr>
                    <th>RANK</th>
                    <th>USER</th>
                    <th>RATING</th>
                    <th>PROBLEMS SOLVED</th>
                    <th>CONTEST RATING</th>
                </tr>
                </thead>
                <tbody>
                {rankedUsers.map((user) => (
                    <LeaderboardRow key={user.id} user={user} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
