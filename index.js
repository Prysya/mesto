const card = new Card();
const cardCreate = (data) => card.create(data);

const cardList = new CardList(document.querySelector('.places-list'), initialCards, cardCreate);
const addCard = (card) => cardList.addCard(card);

const popup = new Popup(document.querySelector('.popup'), addCard);

const userInfo = new UserInfo();
const formValidator = new FormValidator();

cardList.render();




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

