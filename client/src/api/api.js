const API_URL = 'http://localhost:8080/api/v1';
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: 'Unknown server error' };
      }

      const error = new Error(errorBody.message || 'Request failed');
      error.status = response.status;
      error.details = errorBody;
      throw error;
    }
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Network error occurred');
  }
};

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

// CONTESTS
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

// USERS
export const fetchUsers = (token) => {
  return apiCall('/users', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchUser = (userId, token) => {
  return apiCall(`/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
