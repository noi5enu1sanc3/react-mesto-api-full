class Auth {
  constructor() {
    this._baseUrl = 'https://api.meremost.nomoredomains.sbs';
    //this._baseUrl = "http://localhost:3000";
    this._headers = {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    };
  }

  _getResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  register({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
    .then((res) => this._getResponse(res));
  }

  authorize({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
      credentials: 'include',
    })
    .then((res) => this._getResponse(res))
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this.headers,
      credentials: 'include',
    })
    .then((res) => this._getResponse(res))
  }
}

export default Auth;
