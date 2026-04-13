// CONTESTS
import { apiCall } from './base';

export const fetchContests = (token) => {
  return apiCall('/contests', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchContest = async (contestId, token) => {
  return apiCall(`/contests/${contestId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateContest = (contestId, contestData, token) => {
  return apiCall(`/contests/${contestId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const registerToContest = async (contestId, token) => {
  return apiCall(`/contests/${contestId}/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
