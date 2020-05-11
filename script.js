import createCardBlock from "./blocks/place-card/place-card.js";
import popupFunctions from "./blocks/popup/popup.js";

const placesList = document.querySelector(".places-list");
const userAddButton = document.querySelector(".user-info__button");
const popup = document.querySelector(".popup");
//const popupButton = document.querySelector(".popup__close");
const editButton = document.querySelector(".user-info__edit");
const popupEvents = popupFunctions();

//costil
const root = document.querySelector(".root");

const loadImages = () =>
  initialCards.forEach((cards) =>
    placesList.insertAdjacentHTML("afterbegin", createCardBlock(cards))
  );

// const setEventListeners = (formValue) => {
//   const checkInputValidity = () => {
//     return formValue.checkValidity();
//   };
//
//   function isFieldValid(input) {
//     console.log(input.validity);
//     const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
//     const valid = checkInputValidity(); // устанавливаем инпуту кастомные ошибки, если они есть.
//     errorElem.textContent = input.validationMessage;
//     return valid;
//   }
//
//   const isValidForm = () => {
//     const inputs = new Array(formValue.elements)
//     let valid = true;
//
//     inputs.forEach((input) => {
//       if (input.type !== 'submit' && input.type !== 'button') {
//         if (!isFieldValid(input)) valid = false;
//       }
//     });
//
//     return valid;
//   }
// }

const validationForm = (event) => {
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
    if (event.target.value.length === 0) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
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
    if (
      !event.target.validity.valid &&
      event.target.value.length === 0
    ) {
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
      .setAttribute("disabled", true);

  const activateButton = (event) =>
    event.currentTarget
      .querySelector(".popup__button")
      .removeAttribute("disabled");

  const removeErrors = (event) =>
    event.currentTarget
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));

  const validationPlace = (event) => {
    const { placeName, placeLink } = getFormElements(event);

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
    const { editName, editAbout } = getFormElements(event);

    if (!editName.validity.valid || !editAbout.validity.valid) {
      checkEmptyInput(event, editName, editAbout);
      checkRange(event, editName, editAbout);
      checkCorrectInput(event, editName, editAbout);
      disabledButton(event);
    } else {
      removeErrors(event);
      activateButton(event);
    }
  }

  return {validationPlace, validationEdit}
  //validationPlace(event);
};

const validation = validationForm();

const like = (event) => {
  if (event.target.classList.contains("place-card__like-icon")) {
    return event.target.classList.toggle("place-card__like-icon_liked");
  }
  return false;
};

const deleteImage = (event) => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    return event.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
  return false;
};

const addImageStyle = (event) => {
  const popupImage = document.querySelector(".popup__image");

  popupImage.style = event.target.attributes.style.value;
};

const openImage = (event) => {
  if (event.target.className.includes("place-card__image")) {
    popupEvents.popupOpen();
    popupEvents.popupCreateImage();
    addImageStyle(event);
  }
};

const placeEvents = () => {
  const { place } = document.forms;
  const { placeName, placeLink } = place.elements;

  const addImage = (event) => {
    event.preventDefault();

    const obj = { placeName: placeName.value, placeLink: placeLink.value };

    placesList.insertAdjacentHTML("afterbegin", createCardBlock(obj));
    popup.innerHTML = "";
    popupEvents.popupClose();
  };

  place.addEventListener("input", (event) => {
    validation.validationPlace(event);
  });
  place.addEventListener("submit", addImage);
};

const editEvents = () => {
  const { edit } = document.forms;
  const { editName, editAbout } = edit.elements;

  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");

  editName.value = userName.innerText;
  editAbout.value = userJob.innerText;

  const userValues = (event) => {
    event.preventDefault();

    userName.innerText = editName.value;
    userJob.innerText = editAbout.value;

    popup.innerHTML = "";
    popupEvents.popupClose();
  };

  edit.addEventListener("input", validation.validationEdit)
  edit.addEventListener("submit", userValues);
};

userAddButton.addEventListener("click", () => {
  popupEvents.popupCreatePlace();
  popupEvents.popupOpen();
  placeEvents();
});

document.addEventListener("keydown", popupEvents.popupCloseEsc);
placesList.addEventListener("click", (event) => {
  openImage(event);
  like(event);
  deleteImage(event);
});
editButton.addEventListener("click", (event) => {
  popupEvents.popupCreateEdit();
  popupEvents.popupOpen();
  editEvents();
});
popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close")) {
    popup.innerHTML = "";
    popupEvents.popupClose();
  }
});

loadImages();

//TODO: фул рефактор, вынести попапы на замыкание в
// отдельный модуль, заделегировать сабмит
