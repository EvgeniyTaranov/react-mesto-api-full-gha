class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // Карточки
  async getCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    });
    return this._getResponseData(res);
  }

  async deleteCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async addLike(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  async deleteLike(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
    return this._getResponseData(res);
  }

  // Юзер
  async getProfile() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include', // Add this line to include cookies
    });
    return this._getResponseData(res);
  }

  async editProfile(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    return this._getResponseData(res);
  }

  async updateUserPic(avatarLink) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
    return this._getResponseData(res);
  }
}

export const api = new Api({
  baseUrl: 'https://api.evgeniytaranov.nomoredomainsicu.ru',
  // baseUrl: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default Api;