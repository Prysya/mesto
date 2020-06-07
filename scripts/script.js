// API
const api = new Api({
  baseUrl: "https://praktikum.tk/cohort11",
  headers: {
    authorization: "f97522fc-1b9b-4a4c-adb4-0c8368a606b4",
    "Content-Type": "application/json",
  },
});

// api callbacks
const getRequest = (url) => api.get(url);
const getUserInfo = (name, about) => api.getUserInfo(name, about)

// Спиннер
const spinner = new OnloadEffects(document.querySelector(".spinner")).spinner;

// Блюр
const blur = new OnloadEffects(document.querySelector(".user-info")).blur;

// Данные пользователя Имя, Работа
const userInfo = new UserInfo(
  document.querySelector(".user-info__name"),
  document.querySelector(".user-info__job"),
  document.querySelector(".user-info__photo"),
  getRequest,
  blur
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
  editFormValidator.removeEventListeners,
  getUserInfo
);

// Функция колбэк создания карточки
const createCard = (container, data, imagePopup) => {
  const card = new Card(container, data, imagePopup);

  return card.create();
};

// Класс создания добавления и рендера карточек
const cardList = new CardList(
  document.querySelector(".places-list"),
  createCard,
  popupImageOpen,
  getRequest,
  spinner
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

// Загрузка даных пользователя
userInfo.getUserInfo();

// Рендер картинок при загрузке
cardList.render();
