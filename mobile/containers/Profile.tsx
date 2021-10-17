import React from "react";
import ProfileComponent from "../components/Profile";
import useAuth from "../hooks/useAuth";

const Profile = () => {
    const { deleteToken } = useAuth();

    const handleLogout = (): void => {
        deleteToken();
    };

    return (
        <ProfileComponent handleLogout={handleLogout} />
    );
};

export default Profile;
