import { apiCall } from './base';

// AUTHENTICATION
export const authenticateUser = (data) => {
  return apiCall('/auth/authenticate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const registerUser = (data) => {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
