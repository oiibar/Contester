import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/Profile.css"

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>{user.username}'s Profile</h1>
            </div>
            <div className="profile-info">
                <p>Email: {user.email}</p>
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Profile;
