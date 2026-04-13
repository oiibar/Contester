import { apiCall } from './base';

// USERS
export const fetchUsers = (token) => {
  return apiCall('/users', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUser = (userId, token) => {
  return apiCall(`/users/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = (userId, data, token) => {
  return apiCall(`/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
