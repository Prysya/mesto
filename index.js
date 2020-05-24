const card = new Card();
const userInfo = new UserInfo();
const formValidator = new FormValidator();

const popup = new Popup(document.querySelector('.popup'));
const cardList = new CardList(document.querySelector('.places-list'), card.renderDOM(initialCards));



cardList.container.addEventListener("click", event => {
  card.like(event);
  card.remove(event);
})
document.querySelector(".user-info__edit").addEventListener("click", () => {
  popup.open(popupEditOptions);
  popup.editValuesLoad();
});
document.querySelector(".user-info__button").addEventListener("click", () => {
  popup.open(popupPlaceOptions);

  document
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    popup.close();
  }
});

cardList.onloadRender();

