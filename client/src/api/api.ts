interface ApiOptions extends RequestInit {
    headers?: HeadersInit;
}

interface AuthData {
    email: string;
    password: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    points: number;
    createdAt: Date;
    updatedAt: Date;
}

interface RegisterData extends AuthData {
    username: string;
}

interface UsernameUpdateData {
    username: string;
}

interface DiscussionData {
    content: string;
}

interface CodeExecutionData {
    source_code: string;
    language_id: number;
    stdin?: string;
}

interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    status?: number;
}

const API_URL = "http://localhost:8080/api/v1";

export const apiCall = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
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
            const errorResponse: ApiResponse = await response.json();
            throw new Error(errorResponse.message || "Request failed");
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unknown error occurred');
    }
};

export const authenticateUser = (data: AuthData): Promise<ApiResponse> =>
    apiCall("/auth/authenticate", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const registerUser = (data: RegisterData): Promise<ApiResponse> =>
    apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const fetchContests = (token: string): Promise<ApiResponse> =>
    apiCall("/contests", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const fetchUsers = (token: string): Promise<ApiResponse<User[]>> =>
    apiCall("/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const updateUsername = (
    userId: string | number,
    data: UsernameUpdateData,
    token: string
): Promise<ApiResponse> =>
    apiCall(`/users/${userId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

export const fetchDiscussions = (
    problemId: string | number,
    token: string
): Promise<ApiResponse> =>
    apiCall(`/discussions/problem/${problemId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

export const addDiscussion = (
    problemId: string | number,
    data: DiscussionData,
    token: string
): Promise<ApiResponse> =>
    apiCall(`/discussions/problem/${problemId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

export const replyToDiscussion = (
    discussionId: string | number,
    data: DiscussionData,
    token: string
): Promise<ApiResponse> =>
    apiCall(`/discussions/${discussionId}/reply`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

export const executeCode = async (
    data: CodeExecutionData,
    token: string
): Promise<ApiResponse> => {
    const response = await fetch("https://secure.judge0.com/submissions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json();
};