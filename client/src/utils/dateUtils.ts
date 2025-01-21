interface DateFormatOptions {
    weekday: "short" | "long" | "narrow";
    year: "numeric" | "2-digit";
    month: "short" | "long" | "narrow" | "numeric" | "2-digit";
    day: "numeric" | "2-digit";
    hour: "numeric" | "2-digit";
    minute: "numeric" | "2-digit";
    hour12: boolean;
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: DateFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    return date.toLocaleString("en-US", options);
};