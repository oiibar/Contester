import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useFetching } from "../hooks/useFetching";
import { updateUsername } from "../api/api";
import "../styles/Profile.scss";

const Profile = () => {
    const { user, setUser, token } = useAuth(); // Added setUser
    const [newUsername, setNewUsername] = useState(user.username);
    const [message, setMessage] = useState("");

    const { fetching: updateUsernameFetching, isLoading, error } = useFetching(async () => {
        if (newUsername.trim() === user.username) {
            setMessage("The new username must be different from the current username.");
            return;
        }

        if (token) {
            await updateUsername(user.id, { username: newUsername }, token);
            // Update the user in state and localStorage
            const updatedUser = { ...user, username: newUsername };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setMessage("Username updated successfully!");
        } else {
            setMessage("Unable to update username. Please log in again.");
        }
    });

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        setMessage("");
        await updateUsernameFetching();
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>{user.username}'s Profile</h1>
            </div>
            <div className="profile-info">
                <p>Email: {user.email}</p>
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="profile-update">
                <form onSubmit={handleUsernameChange}>
                    <label htmlFor="newUsername">Update Username:</label>
                    <input
                        id="newUsername"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter new username"
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </form>
                {message && (
                    <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
                        {message}
                    </p>
                )}
                {error && <p className="message error">Failed to update username: {error}</p>}
            </div>
        </div>
    );
};

export default Profile;
