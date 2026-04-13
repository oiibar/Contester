import { apiCall } from './base';

// SUBMISSIONS
export const submitProblem = (data, token) => {
  return apiCall('/execute/submit', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
