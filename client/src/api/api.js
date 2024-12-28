const API_URL = "http://localhost:8080/api/v1";

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

export const fetchContests = (token) => {
    return apiCall("/contests", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchUsers = () => apiCall("/users", { method: "GET" });
