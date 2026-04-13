import { apiCall } from './base';

// DISCUSSIONS
export const fetchDiscussions = (problemId, token) => {
  return apiCall(`/discussions/problem/${problemId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const addDiscussion = (problemId, data, token, userId) => {
  return apiCall(`/discussions/problem/${problemId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify(data),
  });
};
export const replyToDiscussion = (discussionId, data, token) => {
  return apiCall(`/discussions/${discussionId}/reply`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
