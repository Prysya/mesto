export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url) {
    return fetch(`${this.baseUrl}/${url}`, { headers: this.headers })
      .then(this._checkResult)
      .catch(this._showError);
  }

  sendUserInfoRequest(jsonBody, link) {
    return fetch(`${this.baseUrl}/users/me${link}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(jsonBody),
    })
      .then(this._checkResult)
      .catch(this._showError);
  }

  postCard(nameValue, linkValue) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    })
      .then(this._checkResult)
      .catch(this._showError);
  }

  handleCardRequest(cardLink, method) {
    return fetch(`${this.baseUrl}/cards/${cardLink}`, {
      method: method,
      headers: this.headers,
    })
      .then(this._checkResult)
      .catch(this._showError);
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _showError = (err) => {
    console.log(err);
    return Promise.reject(err);
  };
}
