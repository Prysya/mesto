"use strict";

const placesList = document.querySelector(".places-list");
const userAddButton = document.querySelector(".user-info__button");
const popup = document.querySelector(".popup");
const popupButton = document.querySelector(".popup__close");

const form = document.forms.new;

const createCardBlock = data => `<div class="place-card">
                  <div class="place-card__image" style="background-image: url(${data.link})">
                    <button class="place-card__delete-icon"></button>
                  </div>
                  <div class="place-card__description">
                    <h3 class="place-card__name">${data.name}</h3>
                    <button class="place-card__like-icon"></button>
                  </div>
                </div>`;

const loadImages = () =>
  initialCards.forEach(cards =>
    placesList.insertAdjacentHTML("beforeend", createCardBlock(cards))
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
  const obj = { name: name.value, link: link.value };

  return placesList.insertAdjacentHTML("beforeend", createCardBlock(obj));
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
