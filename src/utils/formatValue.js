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

export function formatPhone(value) {
    const digits = value.replace(/\D/g, "");

    if (!digits || digits === "380") {
        return "+380";
    }

    let rest = digits.startsWith("380") ? digits.slice(3) : digits;
    rest = rest.slice(0, 9);

    const p1 = rest.slice(0, 2);
    const p2 = rest.slice(2, 5);
    const p3 = rest.slice(5, 7);
    const p4 = rest.slice(7, 9);

    let formatted = "+380";
    if (p1) formatted += ` ${p1}`;
    if (p2) formatted += ` ${p2}`;
    if (p3) formatted += ` ${p3}`;
    if (p4) formatted += ` ${p4}`;

    return formatted;
}

export function normalizePhone(value) {
    const digits = value.replace(/\D/g, "");
    return "+380" + digits.slice(-9);
}
