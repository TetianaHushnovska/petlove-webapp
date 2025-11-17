import { useEffect } from "react";

// Закриває модалку при натисканні Escape
export const useCloseOnEsc = (onClose) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);
};

// Блокує прокрутку body під час відкритої модалки
export const useLockBodyScroll = () => {
    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

// Фунція для налаштування роботи кнопок відповідно до пагінації
export const getPages = (current, total) => {
    const pages = [];

    const start = Math.max(1, current - 1);
    const end = Math.min(total, current + 1);

    if (start > 1) pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total - 1) pages.push("...");

    if (end < total) pages.push(total);

    return pages;
};

// Форматування часу для сторінки друзів
export function getWorkTimeBadge(workDays = []) {
    if (!Array.isArray(workDays) || workDays.length === 0) {
        return "Day and night";
    }

    const openDay = workDays.find(day => day.isOpen);

    if (!openDay) return "No info";

    const { from, to } = openDay;

    if (!from || !to) {
        return "Day and night";
    }

    return `${from} - ${to}`;
}

export function safeField(value, fallback = "No info") {
    return value ? value : fallback;
}