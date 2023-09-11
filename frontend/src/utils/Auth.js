class Auth {
  constructor() {
    this._baseUrl = 'https://api.evgeniytaranov.nomoredomainsicu.ru';
    // this._baseUrl = 'http://localhost:4000';
    this._headers = {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка...: ${res.status}`)
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
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export default new Auth();
