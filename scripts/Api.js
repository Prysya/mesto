class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url) {
    return fetch(`${this.baseUrl}/${url}`, {headers: this.headers})
      .then(res => this._checkResult(res))
      .catch(err => this._showError(err))
  }

  getUserInfo(name, about) {
    return fetch('https://praktikum.tk/cohort11/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._checkResult(res))
      .catch(err => this._showError(err))
  }

  postCard(nameValue, linkValue) {
    return fetch('https://praktikum.tk/cohort11/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue
      })
    }).then(res => this._checkResult(res))
      .catch(err => this._showError(err))
  }

  deleteCard(cardId) {
    fetch(`https://praktikum.tk/cohort1/cards/${cardId}`)
      .then(res => this._checkResult(res))
      .catch(err => this._showError(err))
  }

  _checkResult(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _showError(err) {
    console.log(err);
  }

  // другие методы работы с API
}

