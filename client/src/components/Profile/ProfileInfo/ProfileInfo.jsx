import React, { useState } from 'react';
import MyButton from 'shared/ui/MyButton/MyButton';
import './ProfileInfo.scss';
import { useAuth } from 'auth/AuthContext';
import { updateUser } from 'api/api';

const ProfileInfo = ({ user, setProfileUser }) => {
  const { user: loggedInUser, token } = useAuth();
  const isCurrentUser = loggedInUser && loggedInUser.id === user.id;
  const [bio, setBio] = useState(user.bio || '');

  if (!user) return <p>Loading user info...</p>;

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSaveBio = async () => {
    if (!token) return;

    try {
      await updateUser(loggedInUser.id, { bio }, token);

      const updatedUser = { ...loggedInUser, bio };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfileUser?.(updatedUser);

      alert('Bio updated successfully!');
    } catch (error) {
      console.error('Failed to update bio:', error);
      alert('Error updating bio.');
    }
  };

  return (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <p>
        <strong>Full Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Country:</strong> {user.country}
      </p>
      <p>
        <strong>Bio:</strong>
      </p>
      <textarea
        value={bio}
        readOnly={!isCurrentUser}
        onChange={handleBioChange}
        maxLength="255"
      />
      {isCurrentUser && (
        <MyButton onClick={handleSaveBio}>Save Changes</MyButton>
      )}
    </div>
  );
};

export default ProfileInfo;
