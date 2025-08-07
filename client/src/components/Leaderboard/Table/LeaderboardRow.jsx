import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "hooks/auth/AuthProvider";

const LeaderboardRow = ({ user }) => {
    const navigate = useNavigate();
    const { user: loggedInUser } = useAuth();

    const handleClick = () => {
        navigate(`/profile/${user.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleClick();
    };

    return (
        <tr
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            className="clickable-row"
        >
            <td>{user.rank}</td>
            <td className="user-info">
                <div className="user-prof">{user.username?.[0]?.toUpperCase() || "?"}</div>
                <div className="user-details">
          <span className="username">
            {user.username}
              {loggedInUser?.id === user.id && <span className="current-user"> (You)</span>}
          </span>
                    <span className="country">{user.country || "---"}</span>
                </div>
            </td>
            <td>{user.rating}</td>
            <td>{user.problemsSolved}</td>
            <td>
                <div className="contest-rank">---</div>
            </td>
        </tr>
    );
};

export default LeaderboardRow;
