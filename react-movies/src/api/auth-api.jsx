const API_BASE = 'http://localhost:8080/api/users';

export const login = async (username, password) => {
  const response = await fetch(API_BASE, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const signup = async (username, password) => {
  const response = await fetch(`${API_BASE}?action=register`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};
