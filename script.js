import createCardBlock from "./blocks/place-card/place-card.js";
import popupFunctions from "./blocks/popup/popup.js";
import formValidation from "./validation.js";
import {popupEdit, popupPlace, popupImage} from "./blocks/popup/__content/popup__content.js";

const placesList = document.querySelector(".places-list");
const userAddButton = document.querySelector(".user-info__button");
const editButton = document.querySelector(".user-info__edit");

const popupEvents = popupFunctions();
const validation = formValidation();

const loadImages = () =>
  initialCards.forEach((cards) =>
    placesList.insertAdjacentHTML("afterbegin", createCardBlock(cards))
  );

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
    popupEvents.popupCreate(popupImage());
    popupEvents.popupOpen();
    popupEvents.setCloseButtonEvent();
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
    popupEvents.popupClose();
    popupEvents.removeEventListeners();
  };

  popupEvents.setEventListener(place, "input", validation.validationPlace);
  popupEvents.setEventListener(place, "submit", addImage);
  popupEvents.setCloseButtonEvent();
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

    popupEvents.popupClose();
    popupEvents.removeEventListeners();
  };

  popupEvents.setEventListener(edit, "input", validation.validationEdit);
  popupEvents.setEventListener(edit, "submit", userValues);
  popupEvents.setCloseButtonEvent();
};

userAddButton.addEventListener("click", () => {
  popupEvents.popupCreate(popupPlace())
  popupEvents.popupOpen();
  placeEvents();
});
document.addEventListener("keydown", popupEvents.popupCloseEsc);
placesList.addEventListener("click", (event) => {
  openImage(event);
  like(event);
  deleteImage(event);
});
editButton.addEventListener("click", () => {
  popupEvents.popupCreate(popupEdit())
  popupEvents.popupOpen();
  editEvents();
});

loadImages();