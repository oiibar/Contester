import { config } from '../config/env';

const API_URL = config.apiUrl;
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
