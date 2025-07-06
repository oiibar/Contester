const API_URL = "http://localhost:8080/api/v1";
const CLIENT_ID = "1d286c424ad067c1f3ad915968f1e092";
const SECRET_KEY = "9ada5de0ecc0a5b669fdf1e972ba3af2e6c047445ea3d428fc1c21467f9cd281"
export const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Request failed");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

// AUTH
export const authenticateUser = (data) =>
    apiCall("/auth/authenticate", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const registerUser = (data) =>
    apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

// CONTESTS
export const fetchContests = (token) => {
    return apiCall("/contests", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const fetchContest = async (contestId, token) => {
    return apiCall(`/contests/${contestId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
export const updateContest = (contestId, contestData, token) => {
    return apiCall(`/contests/${contestId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const registerToContest = async (contestId, token) => {
    return apiCall(`/contests/${contestId}/register`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
};

// USERS
export const fetchUsers = (token) => {
    return apiCall("/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const fetchUser = (userId, token) => {
    return apiCall(`/users/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const updateUser = (userId, data, token) => {
    return apiCall(`/users/${userId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// DISCUSSION
export const fetchDiscussions = (problemId, token) => {
    return apiCall(`/discussions/problem/${problemId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};
export const addDiscussion = (problemId, data, token) => {
    return apiCall(`/discussions/problem/${problemId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};
export const replyToDiscussion = (discussionId, data, token) => {
    return apiCall(`/discussions/${discussionId}/reply`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// CODE
export const executeCode = async (data, token) => {
    const response = await fetch("https://api.jdoodle.com/v1/execute", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};