class Auth {
  constructor() {
    this._baseUrl = 'https://api.evgeniytaranov.nomoredomainsicu.ru';
    this._headers = {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка.....: ${res.status}`)
    };
  };

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    }).then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: "include"
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: "include"
    }).then(this._checkResponse);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Auth();
