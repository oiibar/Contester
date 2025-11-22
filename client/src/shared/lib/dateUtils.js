export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export const calculateDuration = (startDateString, endDateString) => {
    const now = new Date(startDateString);
    const endDate = new Date(endDateString);
    const durationMs = endDate - now;

    const totalMinutes = Math.floor(Math.abs(durationMs) / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    let formattedDuration = [];
    if (days > 0) formattedDuration.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours > 0) formattedDuration.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes > 0) formattedDuration.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

    return formattedDuration.join(" ");
};