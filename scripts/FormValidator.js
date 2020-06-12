class FormValidator {
  constructor(form, errors) {
    this._form = form;
    /*
      Можно лучше: В вызывающем коде errors передаются в конструктор,
      здесь лучше использовать этот параметр, нежели глобальную переменную.
      ** Исправил **
     */
    this._errors = errors;

    this._submit = this._form.querySelector(".popup__button");
  }

  _checkInputValidity = (input) => {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this._errors.ru.emptyInput);
      return false;
    }

    if (
      (input.validity.tooShort || input.validity.tooLong) &&
      input.type === "text"
    ) {
      input.setCustomValidity(this._errors.ru.outOfRange);
      return false;
    }

    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(this._errors.ru.invalidLink);
      return false;
    }

    return input.checkValidity();
  };

  _setSubmitButtonState = (state) => {
    if (state) {
      this._submit.removeAttribute("disabled");
    } else {
      /*
        Можно лучше: setAttribute вторым аргументом принимает строку.
        Сейчас используется неявное приведение boolean к строке, чего лучше не делать,
        так как, например, setAttribute('disabled', false) не приведёт к отключению кнопки.
        Вместо true лучше передавать просто пустую строку ''
        https://developer.mozilla.org/ru/docs/Web/API/Element/setAttribute
        -- Исправил --
       */
      this._submit.setAttribute("disabled", "");
    }
  };

  _setErrors = (input) => {
    this._checkInputValidity(input);
    /*
      Можно лучше: Старайтесь не использовать присвоение в return'е, это усложняет восприятие кода.
      -- Исправил --
     */
    this._form.querySelector(`#${input.name}`).textContent =
      input.validationMessage;
  };

  _inputHandler = (event) => {
    this._setErrors(event.target);
    this._setSubmitButtonState(this._form.checkValidity());
  };

  _setEventListeners = () => {
    this._form.addEventListener("input", this._inputHandler);
  };

  _removeErrors = () => {
    this._form.querySelectorAll(".popup__input-error").forEach((error) => {
      error.textContent = "";
    });
  };

  openEvents = (boolean) => {
    this._removeErrors();
    this._setSubmitButtonState(boolean);
    this._setEventListeners();
  };

  removeEventListeners = () => {
    this._form.removeEventListener("input", this._inputHandler);
  };
}
