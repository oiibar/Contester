import React, { useState, FormEvent } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useFetching } from "../hooks/useFetching";
import { updateUsername } from "../api/api";
import "../styles/Profile.scss";

interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

interface FetchingResult {
    fetching: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextType {
    user: User;
    setUser: (user: User) => void;
    token: string | null;
}

const Profile: React.FC = () => {
    // @ts-ignore
    const { user, setUser, token } = useAuth() as AuthContextType;
    const [newUsername, setNewUsername] = useState<string>(user.username);
    const [message, setMessage] = useState<string>("");

    const { fetching: updateUsernameFetching, isLoading, error }: FetchingResult = useFetching(async () => {
        if (newUsername.trim() === user.username) {
            setMessage("The new username must be different from the current username.");
            return;
        }

        if (token) {
            await updateUsername(user.id, { username: newUsername }, token);
            const updatedUser = { ...user, username: newUsername };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setMessage("Username updated successfully!");
        } else {
            setMessage("Unable to update username. Please log in again.");
        }
    });

    const handleUsernameChange = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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