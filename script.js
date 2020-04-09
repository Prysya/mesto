"use strict";

const placesList = document.querySelector(".places-list");
const userAddButton = document.querySelector(".user-info__button");
const popup = document.querySelector(".popup");
const popupButton = document.querySelector(".popup__close");

const form = document.forms.new;

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
  {
    name: "Нургуш",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"
  },
  {
    name: "Тулиновка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"
  },
  {
    name: "Остров Желтухина",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"
  },
  {
    name: "Владивосток",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"
  }
];

const createCardBlock = (name, link) => {
  const card = document.createElement("div");
  const cardImage = document.createElement("div");
  const cardDeleteIcon = document.createElement("button");
  const cardDescription = document.createElement("div");
  const cardName = document.createElement("h3");
  const cardLike = document.createElement("button");

  card.classList.add("place-card");
  cardImage.classList.add("place-card__image");
  cardImage.style.backgroundImage = `url(${link})`;
  cardDeleteIcon.classList.add("place-card__delete-icon");
  cardDescription.classList.add("place-card__description");
  cardName.classList.add("place-card__name");
  cardName.textContent = name;
  cardLike.classList.add("place-card__like-icon");

  card.appendChild(cardImage);
  card.appendChild(cardDescription);
  cardImage.appendChild(cardDeleteIcon);
  cardDescription.appendChild(cardName);
  cardDescription.appendChild(cardLike);

  return card;
};

const loadImages = () =>
  initialCards.forEach(cards =>
    placesList.appendChild(createCardBlock(cards.name, cards.link))
  );

const popupOpen = () => popup.classList.add("popup_is-opened");

const popupClose = () => popup.classList.remove("popup_is-opened");

const popupCloseEsc = event => {
  if (event.key === "Escape") {
    return popupClose();
  }
};

const like = event => {
  if (event.target.classList.contains("place-card__like-icon")) {
    return event.target.classList.toggle("place-card__like-icon_liked");
  }
};

const deleteImage = event => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    return event.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
};

const addImage = event => {
  event.preventDefault();

  const { name, link } = form.elements;

  return placesList.appendChild(createCardBlock(name.value, link.value));
};

userAddButton.addEventListener("click", popupOpen);
popupButton.addEventListener("click", popupClose);
document.addEventListener("keydown", popupCloseEsc);
form.addEventListener("submit", event => {
  addImage(event);
  popupClose();
  form.reset();
});
placesList.addEventListener("click", event => {
  like(event);
  deleteImage(event);
});

loadImages();
