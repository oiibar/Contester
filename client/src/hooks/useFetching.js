import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            setError("");
            await callback(...args);
        } catch (e) {
            setError(e.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return { fetching, isLoading, error };
};

