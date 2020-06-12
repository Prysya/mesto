class Api {
  /*
    Отлично!: Параметры запросов передаются в конструктор.
   */
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  get(url) {
    return fetch(`${this.baseUrl}/${url}`, { headers: this.headers })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  /*
    Можно лучше: Для чего здесь используется link? Исходя из задания, не подразумевается,
    что в конце адреса должно находиться ещё что-то.
    -- для работы с аватаром в конце, по ТЗ должно быть /avatar --
   */
  sendUserInfoRequest(jsonBody, link) {
    /*
      Можно лучше: Стоит использовать this.baseUrl, чтобы не дублировать базовый url.
      ** Исправил **
     */
    return fetch(`${this.baseUrl}/users/me${link}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(jsonBody),
    })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  /*
    Отлично!: Выполнено дополнительное задание.
   */
  postCard(nameValue, linkValue) {
    /*
      Можно лучше: Стоит использовать this.baseUrl, чтобы не дублировать базовый url.
      ** Исправил **
     */
    return fetch(`${this.baseUrl}/cards`, {
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

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */

  handleCardRequest(cardLink, method) {
    /*
      Можно лучше: Стоит использовать this.baseUrl, чтобы не дублировать базовый url.
      ** Исправил **
     */
    return fetch(`${this.baseUrl}/cards/${cardLink}`, {
      method: method,
      headers: this.headers,
    })
      .then((res) => this._checkResult(res))
      .catch((err) => this._showError(err));
  }

  /*
    Отлично!: Функционал проверки результата вынесен в отдельную функцию.
   */
  /*
    Можно лучше: Чтобы не создавать лишнюю анонимную обёртку в каждом методе,
    можно либо сделать _checkResult свойством с arrow-функцией:
    _checkResult = () => {...};
    либо привязывать bind в конструкторе:
    this._checkResult = this._checkResult.bind(this);
    ** Исправил **
   */
  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  /*
    Отлично!: Функционал обработки ошибки вынесен в отдельную функцию.
   */
  /*
    Надо исправить: После блока catch возвращается обычный promise, как будто ошибки и не было.
    То есть в вызывающем коде не будет понятно, была ли ошибка при отправке запроса.
    Чтобы в вызывающем коде можно было по-разному реагировать на случаи успешного выполнения и ошибки,
    необходимо в блоке catch после показа ошибки ошибку с помощью Promise.reject:
    return Promise.reject(err);
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
    ** Исправил **
   */
  /*
    Можно лучше: Чтобы не создавать лишнюю анонимную обёртку в каждом методе,
    можно либо сделать _showError свойством с arrow-функцией:
    _showError = () => {...};
    либо привязывать bind в конструкторе:
    this._showError = this._showError.bind(this);
    ** Исправил **
   */
  _showError = (err) => {
    console.log(err);
    return Promise.reject(err);
  };
}
