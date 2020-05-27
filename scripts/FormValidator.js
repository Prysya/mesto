class FormValidator {
  constructor() {
    this.errors = {
      ru: {
        emptyInput: "Это обязательное поле",
        outOfRange: "Должно быть от 2 до 30 символов",
        correctInput: "",
        invalidLink: "Здесь должна быть ссылка",
      },
    };
  }

  _getFormElements(event) {
    return event.currentTarget.elements;
  }

  _checkEmptyInput(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.value.length === 0
    ) {
      inputs.forEach((input) => {
        if (input.value.length === 0) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.emptyInput;
        }
      });
    }
  }

  _checkRange(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.value.length === 1 ||
      event.target.value.length > 30
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.outOfRange;
        }
      });
    }
  }

  _checkCorrectInput(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.validity.valid
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.correctInput;
        }
      });
    }
  }

  _checkLink(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      (!event.target.validity.valid && event.target.type === "url")
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.ru.invalidLink;
        }
      });
    }
  }

_disabledButton(event) {
    return event.currentTarget
      .querySelector(".popup__button")
      .classList.add("popup__button_disabled");
  }

  _activateButton(event) {
    return event.currentTarget
      .querySelector(".popup__button")
      .classList.remove("popup__button_disabled");
  }

  _removeErrors(event) {
    return event.currentTarget
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));
  }

  validation(event) {
    event.preventDefault();

    const { firstInput, secondInput } = this._getFormElements(event);

    if (!firstInput.validity.valid || !secondInput.validity.valid) {
      this._checkEmptyInput(event, firstInput, secondInput);
      this._checkRange(event, firstInput);
      this._checkCorrectInput(event, firstInput, secondInput);
      this._checkLink(event, secondInput);
      this._disabledButton(event);
    } else {
      this._removeErrors(event);
      this._activateButton(event);
    }
  }
}
