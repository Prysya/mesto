// IIFE обертка
(function () {
  "use strict";

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

  // API для отправки PATCH запроса с данными пользователя
  const sendUserInfoRequest = (jsonBody, link) =>
    api.sendUserInfoRequest(jsonBody, link);

  // API для работы с карточками (лайки, удаления)
  const handleCardRequest = (cardLink, method) =>
    api.handleCardRequest(cardLink, method);

  // Спиннер
  const handleSpinner = new Spinner(document.querySelector(".spinner"))
    .handleSpinner;

  // Блюр
  const handleBlurEffect = new BlurEffect(document.querySelector(".user-info"))
    .handleBlurEffect;

  // Данные пользователя Имя, Работа
  const userInfo = new UserInfo(
    document.querySelector(".user-info__name"),
    document.querySelector(".user-info__job"),
    document.querySelector(".user-info__photo")
  );

  // Колбэк функция для обновления значений профиля
  const updateUserInfo = (name, about) => {
    userInfo.userName = name;
    userInfo.userAbout = about;
    userInfo.updateUserInfo();
  };

  // Валидация формы добавления карточек
  const placeFormValidator = new FormValidator(
    document.querySelector("#new-place"),
    errors
  );

  // Валидация формы изменения данных профиля
  const editFormValidator = new FormValidator(
    document.querySelector("#edit"),
    errors
  );

  // Валидация формы изменения данных профиля
  const avatarFormValidator = new FormValidator(
    document.querySelector("#new-avatar"),
    errors
  );

  // Класс попапа с картинкой
  const popupImage = new PopupImage(
    document.querySelector(".popup_type_image")
  );

  // Фукнция открытия попапа с картинкой
  const popupImageOpen = (event) => {
    return popupImage.open(event.target.style.backgroundImage.slice(5, -2));
  };

  // Колбэк функция для изменения данных профиля
  const submitEditForm = (body, link) => {
    return sendUserInfoRequest(body, link).then((result) => {
      updateUserInfo(result.name, result.about);
      placeFormValidator.removeEventListeners();

      return result;
    });
  };

  // Колбэк добавления валидатора для формы Place
  const addEditFormValidator = () => editFormValidator.openEvents(true);

  // Попап с формой редактирования профиля
  const popupEdit = new PopupEdit(
    document.querySelector(".popup_type_edit"),
    addEditFormValidator,
    submitEditForm
  );

  // Колбэк функция для создания карточки
  const createCardNode = (data) => {
    const card = new Card(data, popupImageOpen, handleCardRequest, owner);

    return card.create();
  };

  // Класс создания добавления и рендера карточек
  const cardList = new CardList(
    document.querySelector(".places-list"),
    createCardNode
  );

  // Колбэк добавления карточки для формы Place
  const submitPlaceForm = (place, link) => {
    return api
      .postCard(place, link)
      .then(cardList.addCard)
      .then(placeFormValidator.removeEventListeners);
  };

  // Колбэк добавления валидатора для формы Place
  const addPlaceFormValidator = () => placeFormValidator.openEvents(false);

  // Попап с формой добавления карточки
  const popupPlace = new PopupPlace(
    document.querySelector(".popup_type_place"),
    addPlaceFormValidator,
    submitPlaceForm
  );

  // Колбэк функция для изменения данных профиля
  const submitAvatarForm = (body, link, url) => {
    return sendUserInfoRequest(body, link).then(() => {
      userInfo.avatar.style.backgroundImage = `url(${url})`;
      avatarFormValidator.removeEventListeners();
    });
  };

  // Колбэк добавления валидатора для формы Place
  const addAvatarFormValidator = () => avatarFormValidator.openEvents(false);

  // Попап с формой изменения аватара
  const popupAvatar = new PopupAvatar(
    document.querySelector(".popup_type_avatar"),
    addAvatarFormValidator,
    submitAvatarForm
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

  // Загрузка даных пользователя при загрузке
  api
    .get("users/me")
    .then((result) => {
      userInfo.avatar.style.backgroundImage = `url(${result.avatar})`;
      owner.ownerId = result._id;

      updateUserInfo(result.name, result.about);

      return result;
    })
    .then((result) => popupEdit.setDefaultValue(result.name, result.about))
    .then(() => handleBlurEffect(false))
    .catch((err) => console.log(err));

  // Рендер картинок при загрузке
  api
    .get("cards")
    .then((cards) => cardList.render(cards))
    .then(() => handleSpinner(false))
    .catch((err) => console.log(err));
})();
