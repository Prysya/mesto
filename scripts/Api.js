class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url) {
    return fetch(`${this.baseUrl}/${url}`, { headers: this.headers })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  userInfoRequest(jsonBody, link) {
    return fetch(`https://praktikum.tk/cohort11/users/me${link}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(jsonBody),
    })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  postCard(nameValue, linkValue) {
    return fetch("https://praktikum.tk/cohort11/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  cardRequests(cardLink, method) {
    return fetch("https://praktikum.tk/cohort11/cards/" + cardLink, {
      method: method,
      headers: this.headers,
    })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _showError(err) {
    console.log(err);
  }
}
