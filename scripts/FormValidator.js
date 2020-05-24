/*
FormValidator
Класс для валидации полей формы. Его конструктор должен принимать один из двух аргументов:

    - элемент формы,
    - или элемент попапа, внутри которого находится эта форма.

Также у класса должны быть определены методы:

    - checkInputValidity, чтобы валидировать поля. Метод показывает ошибку, если инпуты не проходят валидацию.
      Если проходят — скрывает ошибку.
    - setSubmitButtonState, чтобы делать кнопку сабмита активной и неактивной.
      Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет.
      Этот метод должен вызываться при любом изменении данных формы.
      Если поля в порядке, кнопка становится активной. Если одно из полей не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна.
    - setEventListeners, чтобы добавлять обработчики.
      Добавляет необходимые для валидации обработчики всем полям формы.
 */

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

  getFormElements(event) {
    return event.currentTarget.elements;
  }

  checkEmptyInput(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.value.length === 0
    ) {
      inputs.forEach((input) => {
        if (input.value.length === 0) {
          document.querySelector(`#${input.name}`).textContent =
            this.errors.ru.emptyInput;
        }
      });
    }
  }

  checkRange(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.value.length === 1 ||
      event.target.value.length > 30
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            this.errors.ru.outOfRange;
        }
      });
    }
  }

  checkCorrectInput(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.validity.valid
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            this.errors.ru.correctInput;
        }
      });
    }
  }

  checkLink(event, ...inputs) {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      (!event.target.validity.valid && event.target.value.length === 0)
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            this.errors.ru.emptyInput;
        }
      });
    } else if (
      !event.target.validity.valid &&
      event.target.name === "placeLink"
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            this.errors.ru.invalidLink;
        }
      });
    }
  }

  disabledButton(event) {
    return event.currentTarget
      .querySelector(".popup__button")
      .classList.add("popup__button_disabled");
  }

  activateButton(event) {
    return event.currentTarget
      .querySelector(".popup__button")
      .classList.remove("popup__button_disabled");
  }

  removeErrors(event) {
    return event.currentTarget
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));
  }

  validationPlace(event) {
    const { placeName, placeLink } = this.getFormElements(event);

    if (!placeName.validity.valid || !placeLink.validity.valid) {
      this.checkEmptyInput(event, placeName, placeLink);
      this.checkRange(event, placeName);
      this.checkCorrectInput(event, placeName, placeLink);
      this.checkLink(event, placeLink);
      this.disabledButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }

  validationEdit(event) {
    const { editName, editAbout } = this.getFormElements(event);

    if (!editName.validity.valid || !editAbout.validity.valid) {
      this.checkEmptyInput(event, editName, editAbout);
      this.checkRange(event, editName, editAbout);
      this.checkCorrectInput(event, editName, editAbout);
      this.disabledButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }
}
