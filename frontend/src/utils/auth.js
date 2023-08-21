// auth.js
export const BASE_URL = 'https://api.server.students.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
    credentials: 'omit',
  })
    .then((res) => checkResponse(res));
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => checkResponse(res));
}

export const getContent = () => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return Promise.reject('No token found');
  }
  
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then((res) => checkResponse(res))
    .then(data => data);
};
