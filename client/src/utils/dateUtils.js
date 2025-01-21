// utils/dateUtils.js

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        weekday: "short", // Short weekday name (e.g., Mon)
        year: "numeric",
        month: "short", // Short month name (e.g., Dec)
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12-hour format
    });
};
