class FormValidator {
  constructor(form, errors) {
    this._form = form;
    this.errors = errors;

    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  _checkEmptyInput = (event, inputs) => {
    if (event.target.value.length === 0) {
      inputs.forEach((input) => {
        if (input.value.length === 0) {
          this._form.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.emptyInput;
        }
      });
    }
  };

  _checkRange = (event, inputs) => {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          this._form.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.outOfRange;
        }
      });
    }
  };

  _checkCorrectInput = (event, inputs) => {
    if (event.target.validity.valid) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          this._form.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.correctInput;
        }
      });
    }
  };

  _checkLink = (event, inputs) => {
    if (!event.target.validity.valid && event.target.type === "url") {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          this._form.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.invalidLink;
        }
      });
    }
  };

  _disabledButton() {
    this._form.querySelector(".popup__button").setAttribute("disabled", true);
  }

  _activateButton() {
    this._form.querySelector(".popup__button").removeAttribute("disabled");
  }

  _removeErrors() {
    this._form
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));
  }

  /**
   * Надо исправить:
   * Не масштабируемый код.
   * Следует перебирать все элементы формы.
   * Чтобы избавиться от проблемы, что form.elements содержит кнопку, можно использовать
   * form.querySelectorAll('.popup__input')
   * -- Исправил--
   */

  checkInputValidity = (event) => {
    if (Array.from(this._inputs).every((input) => input.validity.valid)) {
      /**
       * Можно лучше:
       * Дублирование кода.
       * Лучше создать функцию, которая проверит поле на соответствие требованиям и вернет
       * либо текст ошибки, либо пустую строку. Далее другая функция уже снимает/ставит текст ошибки.
       * -- Исправил --
       */
      this._removeErrors();
      this._activateButton();
    } else {
      this._checkEmptyInput(event, this._inputs);
      this._checkRange(event, this._inputs);
      this._checkCorrectInput(event, this._inputs);
      this._checkLink(event, this._inputs);
      this._disabledButton();
    }
  };

  _setEventListeners = () => {
    this._form.addEventListener("input", this.checkInputValidity);
  }
}
