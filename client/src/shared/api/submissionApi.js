import { apiCall } from './base';

// SUBMISSIONS
export const submitProblem = (data, token) => {
  return apiCall('/submission', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
