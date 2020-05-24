import createCardBlock from "./blocks/place-card/place-card.js";
import popupFunctions from "./blocks/popup/popup.js";
import formValidation from "./validation.js";
import { like, deleteImage, addImageStyle } from "./utils.js";
import {
  popupTemplate,
  popupImage,
} from "./blocks/popup/__content/popup__content.js";
import { popupEditOptions, popupPlaceOptions } from "./scripts/constants.js";

const placesList = document.querySelector(".places-list");
const userAddButton = document.querySelector(".user-info__button");
const editButton = document.querySelector(".user-info__edit");

const popupEvents = popupFunctions();
const validation = formValidation();

const loadImages = () =>
  initialCards.forEach((cards) =>
    placesList.insertAdjacentHTML("afterbegin", createCardBlock(cards))
  );

const openImage = (event) => {
  if (event.target.className.includes("place-card__image")) {
    popupEvents.popupCreate(popupImage());
    popupEvents.popupOpen();
    popupEvents.setCloseButtonEvent();
    addImageStyle(event);
  }
};

const placeEvents = () => {
  const { place } = document.forms;
  const { placeName, placeLink } = place.elements;

  placeName.focus();
  document
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  const addImage = (event) => {
    event.preventDefault();

    const obj = { placeName: placeName.value, placeLink: placeLink.value };

    if (placeLink.validity.valid && placeLink.validity.valid) {
      placesList.insertAdjacentHTML("afterbegin", createCardBlock(obj));
      popupEvents.popupClose();
      popupEvents.removeEventListeners();
    }
  };

  popupEvents.setEventListener(place, "input", validation.validationPlace);
  popupEvents.setEventListener(place, "submit", validation.validationPlace);
  popupEvents.setEventListener(place, "submit", addImage);
  popupEvents.setCloseButtonEvent();
};

const editEvents = () => {
  const { edit } = document.forms;
  const { editName, editAbout } = edit.elements;

  const userName = document.querySelector(".user-info__name");
  const userJob = document.querySelector(".user-info__job");

  editName.focus();
  editName.value = userName.innerText;
  editAbout.value = userJob.innerText;

  const userValues = (event) => {
    event.preventDefault();

    if (editName.validity.valid && editAbout.validity.valid) {
      userName.innerText = editName.value;
      userJob.innerText = editAbout.value;

      popupEvents.popupClose();
      popupEvents.removeEventListeners();
    }
  };

  popupEvents.setEventListener(edit, "input", validation.validationEdit);
  popupEvents.setEventListener(edit, "submit", userValues);
  popupEvents.setCloseButtonEvent();
};

const imageListener = (event) => {
  openImage(event);
  like(event);
  deleteImage(event);
};

const editListener = () => {
  popupEvents.popupCreate(popupTemplate(popupEditOptions));
  popupEvents.popupOpen();
  editEvents();
};

const placeListener = () => {
  popupEvents.popupCreate(popupTemplate(popupPlaceOptions));
  popupEvents.popupOpen();
  placeEvents();
};

document.addEventListener("keydown", popupEvents.popupCloseEsc);
placesList.addEventListener("click", imageListener);
editButton.addEventListener("click", editListener);
userAddButton.addEventListener("click", placeListener);

loadImages();