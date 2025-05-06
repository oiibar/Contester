export function getToken() {
    const data = localStorage.getItem("token");
    return data ? JSON.parse(data) : "";
}

export function setToken(key, token) {
    localStorage.setItem(key, JSON.stringify(token));
}

export function removeToken(key) {
    localStorage.removeItem(key);
}
