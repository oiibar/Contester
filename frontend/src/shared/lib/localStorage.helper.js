export function getToken(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : '';
}

export function setToken(key, token) {
  localStorage.setItem(key, JSON.stringify(token));
}

export function removeToken(key) {
  localStorage.removeItem(key);
}
