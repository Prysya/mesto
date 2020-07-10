export default class FormValidator {
  constructor(form, errors) {
    this._form = form;
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
      this._submit.setAttribute("disabled", "");
    }
  };

  _setErrors = (input) => {
    this._checkInputValidity(input);
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
