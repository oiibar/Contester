import React from "react";
import "./Profile.scss";
import Header from "../../components/Profile/Header/Header";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import Stats from "../../components/Profile/Stats/Stats";
import Activities from "../../components/Profile/Activities/Activities";
import {useParams} from "react-router";
import {useUserProfile} from "../../hooks/profile/useUserProfile";

const Profile = () => {
    const { userId } = useParams();
    const { profileUser, users, isLoading, error } = useUserProfile(userId);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading users!</div>;
    }

    return (
        <>
            <Header user={profileUser || users[0]} users={users} />
            <div className="profile-content">
                <ProfileInfo user={profileUser || users[0]} />
                <div className="profile-info2">
                    <Stats user={profileUser || users[0]} users={users} />
                    <Activities />
                </div>
            </div>
        </>
    );
};

export default Profile;