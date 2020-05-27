const card = new Card();
const cardCreate = (data) => card.create(data);

const cardList = new CardList(
  document.querySelector(".places-list"),
  initialCards,
  cardCreate
);
const addCard = (card) => cardList.addCard(card);

const userInfo = new UserInfo();
const setUserInfo = (userName, userJob) =>
  userInfo.setUserInfo(userName, userJob);

const formValidator = new FormValidator();
const validation = (event) => formValidator.validation(event);

const popup = new Popup(
  document.querySelector(".popup"),
  addCard,
  validation,
  setUserInfo
);
const imagePopupRender = (data) => popup.imagePopupRender(data);

document.querySelector(".user-info__edit").addEventListener("click", () => {
  popup.open(popupEditOptions);
  popup.editEventListeners();
  popup.returnUserValues();
});
document.querySelector(".user-info__button").addEventListener("click", () => {
  popup.open(popupPlaceOptions);
  popup.placesEventListeners();
  document
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
});
document.querySelector(".places-list").addEventListener("click", (event) => {
  if (event.target.className.includes("place-card__image")) {
    imagePopupRender(event.target.attributes.style.nodeValue);
  }
});

cardList.render();
