// API
const api = new Api({
  baseUrl: "https://praktikum.tk/cohort11",
  headers: {
    authorization: "f97522fc-1b9b-4a4c-adb4-0c8368a606b4",
    "Content-Type": "application/json",
  },
});

// Класс для хранения данных пользователя
const owner = new Owner();

// API для запроса на сервер
const getRequest = (url) => api.get(url);

// API для отправки PATCH запроса с данными пользователя
const userInfoRequest = (jsonBody, link) => api.userInfoRequest(jsonBody, link);

// API для добавления карточки на сервер
const postCard = (name, value) => api.postCard(name, value);

// API для работы с карточками (лайки, удаления)
const cardRequests = (cardLink, method) => api.cardRequests(cardLink, method);

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
  blur,
  owner
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

// Валидация формы изменения данных профиля
const avatarFormValidator = new FormValidator(
  document.querySelector(".form__avatar"),
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
  userInfoRequest
);

// Функция колбэк создания карточки
const createCard = (container, data, imagePopup, cardRequests, owner) => {
  const card = new Card(container, data, imagePopup, cardRequests, owner);

  return card.create();
};

// Класс создания добавления и рендера карточек
const cardList = new CardList(
  document.querySelector(".places-list"),
  createCard,
  popupImageOpen,
  getRequest,
  spinner,
  cardRequests,
  owner
);

// Функция добавления карточки на страницу
const cardAdd = (place) => cardList.addCard(place);

// Попап с формой добавления карточки
const popupPlace = new PopupPlace(
  document.querySelector(".popup_type_place"),
  cardAdd,
  placeFormValidator.openEvents,
  placeFormValidator.removeEventListeners,
  postCard
);

// Попап с формой изменения аватара
const popupAvatar = new PopupAvatar(
  document.querySelector(".popup_type_avatar"),
  userInfo,
  avatarFormValidator.openEvents,
  avatarFormValidator.removeEventListeners,
  userInfoRequest
);

// Слушатели кнопок для открытия нужного Попапа
document
  .querySelector(".user-info__edit")
  .addEventListener("click", popupEdit.open);
document
  .querySelector(".user-info__button")
  .addEventListener("click", popupPlace.open);
document
  .querySelector(".user-info__photo")
  .addEventListener("click", popupAvatar.open);
// Загрузка даных пользователя
userInfo.getUserInfo();

// Рендер картинок при загрузке
cardList.render();
