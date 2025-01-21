import { useState } from "react";

export const useFetching = <T extends (...args: any[]) => Promise<void>>(
    callback: T
) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetching = async (...args: Parameters<T>): Promise<void> => {
        try {
            setIsLoading(true);
            setError("");
            await callback(...args);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { fetching, isLoading, error };
};
