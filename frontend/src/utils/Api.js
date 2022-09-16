class Api {
  constructor({ headers, id }, options) {
    this._headers = headers;
    this._id = id;
    this._baseUrl = options.baseUrl;
  }

  _getResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => this._getResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      credentials: 'include',
    })
    .then((res) => this._getResponse(res));
  }

  uploadNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
    }),
    })
    .then(res => this._getResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    })
    .then(res => this._getResponse(res));
  }

  toggleLike(cardId, isLiked) {
    if (isLiked === false) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: 'include',
      })
      .then(res => this._getResponse(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      })
      .then(res => this._getResponse(res));
    }
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
    })
    })
    .then(res => this._getResponse(res))
  }
}

const api = new Api(
  {
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    baseUrl: "https://api.meremost.nomoredomains.sbs",
    //baseUrl: "http://localhost:3000",
    credentials: 'include',
  }
);

export default api;
