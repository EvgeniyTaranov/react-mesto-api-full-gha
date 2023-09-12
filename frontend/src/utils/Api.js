// class Api {
//   constructor({ baseUrl, headers }) {
//     this._headers = headers
//     this._baseUrl = baseUrl
//   }

//   _getResponseData(res) {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//     return res.json();
//   }

//   getProfile() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       credentials: 'include',
//       headers: this._headers,
//     }).then(this._getResponseData)
//   }

//   getCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       credentials: 'include',
//       headers: this._headers,
//     }).then(this._getResponseData)
//   }

//   editProfile(name, about) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       credentials: 'include',
//       method: 'PATCH',
//       body: JSON.stringify({
//         name: name,
//         about: about
//       })
//     }).then(this._getResponseData)
//   }

//   updateUserPic(avatarLink) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       credentials: 'include',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: avatarLink
//       })
//     }).then(this._getResponseData)
//   }

//   addCard(name, link) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         link
//       })
//     }).then(this._getResponseData)
//   }

//   deleteCard(id) {
//     return fetch(`${this._baseUrl}/cards/${id}`, {
//       method: 'DELETE',
//       credentials: 'include',
//       headers: this._headers
//     }).then(this._getResponseData)
//   }

//   deleteLike(id) {
//     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
//       method: 'DELETE',
//       headers: this._headers
//     }).then(this._getResponseData)
//   }

//   addLike(id) {
//     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
//       method: 'PUT',
//       credentials: 'include',
//       headers: this._headers
//     }).then(this._getResponseData)
//   }
// }

// export const api = new Api({
//   baseUrl: 'https://api.evgeniytaranov.nomoredomainsicu.ru',
//   headers: {
//     authorization: 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b',
//     'Content-Type': 'application/json'
//   }
// });

// export default Api;

require('dotenv').config(); // Подключаем библиотеку для чтения .env файла

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }

  updateUserPic(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._getResponseData);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${process.env.JWT_SECRET}`, // Используем переменную окружения для JWT
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: 'https://api.evgeniytaranov.nomoredomainsicu.ru',
});

export default Api;
