// Данные пользователя Имя, Работа
const userInfo = new UserInfo(
  document.querySelector(".user-info__name"),
  document.querySelector(".user-info__job")
);

// Валидация формы добавления карточек
const placeFormValidator = new FormValidator(
  document.querySelector(".form__place"),
  errors
);

// Валидация формы изменения данных профиля
const editFormValidator = new FormValidator(
  document.querySelector(".form__edit"),
  errors
);

// Класс попапа с картинкой
const popupImage = new PopupImage(document.querySelector(".popup_type_image"));

// Фукнция открытия попапа с картинкой
const popupImageOpen = (event) => {
  return popupImage.open(event.target.style.backgroundImage.slice(5, -2));
};

// Попап с формой редактирования профиля
const popupEdit = new PopupEdit(
  document.querySelector(".popup_type_edit"),
  userInfo,
  editFormValidator.openEvents,
  editFormValidator.removeEventListeners
);

// Функция колбэк создания карточки
const createCard = (container, data, imagePopup) => {
  const card = new Card(container, data, imagePopup);

  return card.create();
};

// Класс создания добавления и рендера карточек
const cardList = new CardList(
  document.querySelector(".places-list"),
  initialCards,
  createCard,
  popupImageOpen
);

// Функция добавления карточки на страницу
const cardAdd = (place) => cardList.addCard(place);

// Попап с формой добавления карточки
const popupPlace = new PopupPlace(
  document.querySelector(".popup_type_place"),
  cardAdd,
  placeFormValidator.openEvents,
  placeFormValidator.removeEventListeners
);

// Слушатели кнопок для открытия нужного Попапа
document
  .querySelector(".user-info__edit")
  .addEventListener("click", popupEdit.open);
document
  .querySelector(".user-info__button")
  .addEventListener("click", popupPlace.open);

// Рендер картинок при загрузке
cardList.render();
