export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const formatDate = (dateString) => new Date(dateString).toLocaleString();

export const formatPaymentMethod = (method) =>
    method.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

export const getUniqueBuildings = (value) => {
    return Array.from(new Set(value.map((p) => p.building_name)));
};

export const generateToken = () =>
    `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;

export const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};
