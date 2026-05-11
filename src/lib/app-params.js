const isNode = typeof window === 'undefined';
// Fallback for SSR or non-browser environments
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
    if (isNode) {
        return defaultValue;
    }

    // Changed prefix  to 'app_'
    const storageKey = `app_${toSnakeCase(paramName)}`;
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(paramName);

    if (removeFromUrl && searchParam) {
        urlParams.delete(paramName);
        const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
        window.history.replaceState({}, document.title, newUrl);
    }

    if (searchParam) {
        storage.setItem(storageKey, searchParam);
        return searchParam;
    }

    if (defaultValue) {
        // Only set storage if it hasn't been set by a URL param previously
        if (!storage.getItem(storageKey)) {
            storage.setItem(storageKey, defaultValue);
        }
        return defaultValue;
    }

    return storage.getItem(storageKey) || null;
}

const getAppParams = () => {
    // Clear tokens if requested via URL
    if (getAppParamValue("clear_session") === 'true') {
        storage.removeItem('app_access_token');
        storage.removeItem('app_token');
    }

    return {
        // Use your custom environment variables here
        appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_APP_ID }),
        token: getAppParamValue("token", { removeFromUrl: true }),
        apiUrl: getAppParamValue("api_url", { defaultValue: import.meta.env.VITE_API_URL }),
        environment: import.meta.env.MODE, // 'development' or 'production'
    }
}

export const appParams = {
    ...getAppParams()
};