const formValidation = () => {
  const errors = {
    ru: {
      emptyInput: "Это обязательное поле",
      outOfRange: "Должно быть от 2 до 30 символов",
      correctInput: "",
      invalidLink: "Здесь должна быть ссылка",
    },
  };

  const getFormElements = (event) => event.currentTarget.elements;

  const checkEmptyInput = (event, ...inputs) => {
    if (
      event.target.querySelector(".popup__button_disabled") ||
      event.target.value.length === 0
    ) {
      inputs.forEach((input) => {
        if (input.value.length === 0) {
          document.querySelector(`#${input.name}`).textContent =
            errors.ru.emptyInput;
        }
      });
    }
  };

  const checkRange = (event, ...inputs) => {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            errors.ru.outOfRange;
        }
      });
    }
  };

  const checkCorrectInput = (event, ...inputs) => {
    if (event.target.validity.valid) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            errors.ru.correctInput;
        }
      });
    }
  };

  const checkLink = (event, ...inputs) => {
    if (!event.target.validity.valid && event.target.value.length === 0) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            errors.ru.emptyInput;
        }
      });
    } else if (
      !event.target.validity.valid &&
      event.target.name === "placeLink"
    ) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent =
            errors.ru.invalidLink;
        }
      });
    }
  };

  const disabledButton = (event) =>
    event.currentTarget
      .querySelector(".popup__button")
      .classList.add("popup__button_disabled");

  const activateButton = (event) =>
    event.currentTarget
      .querySelector(".popup__button")
      .classList.remove("popup__button_disabled");

  const removeErrors = (event) =>
    event.currentTarget
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));

  const validationPlace = (event) => {
    const { placeName, placeLink, submit } = getFormElements(event);

    if (submit.classList.contains("popup__button_disabled")) {
      const inputs = [];
    }
    if (!placeName.validity.valid || !placeLink.validity.valid) {
      checkEmptyInput(event, placeName, placeLink);
      checkRange(event, placeName);
      checkCorrectInput(event, placeName, placeLink);
      checkLink(event, placeLink);
      disabledButton(event);
    } else {
      removeErrors(event);
      activateButton(event);
    }
  };

  const validationEdit = (event) => {
    const { editName, editAbout, submit } = getFormElements(event);

    if (!editName.validity.valid || !editAbout.validity.valid) {
      checkEmptyInput(event, editName, editAbout);
      checkRange(event, editName, editAbout);
      checkCorrectInput(event, editName, editAbout);
      disabledButton(event);
    } else {
      removeErrors(event);
      activateButton(event);
    }
  };

  return { validationPlace, validationEdit };
};

export default formValidation;
