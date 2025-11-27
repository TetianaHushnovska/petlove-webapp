export const safeValue = (value, fallback = "Unknown") => {
    if (value === undefined || value === null || value === "") {
        return fallback;
    }
    return value;
};

export const formatDate = (iso) => {
    if (!iso) return "Unknown";

    const date = new Date(iso);
    if (isNaN(date)) return "Unknown";

    return date.toLocaleDateString("uk-UA");
};
