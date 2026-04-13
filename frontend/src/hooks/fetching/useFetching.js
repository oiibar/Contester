import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            setError(null);
            return await callback(...args);
        } catch (e) {
            setError({
                message: e.message || "Request failed. Please try again.",
                status: e.status || null,
                details: e.details || null,
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { fetching, isLoading, error };
};