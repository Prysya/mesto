/*
  Надо исправить: Создание множества переменных, не обернутых в IIFE, засоряет глобальную область видимости.
  Когда код расположен в разных файлах, его нужно заключать в модули, т.к. если файлов будет много,
  то в разных файлах могут появится функции или переменные с одинаковыми именами,
  тогда они будут переопределять друг друга. Модуль должен предоставлять наружу только минимально необходимый api.
  https://developer.mozilla.org/ru/docs/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/IIFE
  -- Исправил --
 */
/*
  Можно лучше: Рекомендуется использовать строгий режим, в котором меньше вероятность допустить синтаксические ошибки.
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Strict_mode
  -- Исправил --
 */

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

  // API для запроса на сервер
  const getRequest = (url) => api.get(url);

  // API для отправки PATCH запроса с данными пользователя
  /*
  Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
  Далее описываются элементы, к которым действие относится.
  Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
  -- Исправил --
 */
  const sendUserInfoRequest = (jsonBody, link) =>
    api.sendUserInfoRequest(jsonBody, link);

  // API для добавления карточки на сервер
  const postCard = (name, value) => api.postCard(name, value);

  // API для работы с карточками (лайки, удаления)
  /*
  Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
  Далее описываются элементы, к которым действие относится.
  Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
  -- Исправил --
 */
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

  // Колбэк функция для обновления значний профиля
  const updateUserInfo = (name, about) => {
    userInfo.setUserInfo(name, about);
    userInfo.updateUserInfo();
  }

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

  // Попап с формой редактирования профиля
  const popupEdit = new PopupEdit(
    document.querySelector(".popup_type_edit"),
    updateUserInfo,
    editFormValidator.openEvents,
    editFormValidator.removeEventListeners,
    sendUserInfoRequest
  );

  // Функция колбэк создания карточки
  const createCardNode = (data) => {
    const card = new Card(data, popupImageOpen, handleCardRequest, owner);

    return card.create();
  };

  // Класс создания добавления и рендера карточек
  const cardList = new CardList(
    document.querySelector(".places-list"),
    createCardNode
  );

  // Функция добавления карточки на страницу
  const addCard = (place) => cardList.addCard(place);

  // Попап с формой добавления карточки
  const popupPlace = new PopupPlace(
    document.querySelector(".popup_type_place"),
    addCard,
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
    sendUserInfoRequest
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
/*
  Резюме по работе:
  Большой объём работы проделали, выполнили дополнительные задания, вы молодец!

  Что понравилось:
  - код разбит на множество классов;
  - выполнены дополнительные задания;
  - одинаковое форматирование кода;
  - в классе Api общая для каждого запроса логика вынесена отдельные "приватные" методы.

  Что важно исправить:
  - не использовать бэм-элементы в отрыве от своего блока или заменить селектор для поиска форм в js;
  ** Исправил **
  - обернуть код в script.js в IIFE;
  ** Исправил **
  - в Api._showError возвращать ошибку;
  ** Исправил **
  - в Card.create не добавлять карточку в контейнер;
  ** Исправил **
  - в конец каждой цепочки промисов добавить catch блок;
  ** Исправил **
  - в классе CardList реализовать методы render и addCard согласно условиям задачи 8-го спринта;
  ** Исправил **
  - не искать один и тот же dom-элемент дважды;
  ** Исправил **
  - обновление информации о пользователе на странице должно происходить
  через методы setUserInfo и updateUserInfo класса UserInfo;
  ** Исправил **
  - устранить баг: открыть форму профиля, удалить любое поле (чтобы появилась ошибка), закрыть попап, снова его открыть,
  контент в инпутах будет валидный, но кнопка "сохранить" будет неактивна.
  ** Исправил **

  Что можно улучшить:
  - использовать строгий режим;
  ** Исправил **
  - корректно называть переменные и функции исходя из их предназначения;
  ** Исправил **
  - в Api.userInfoRequest убрать параметр неиспользуемый link;
  ** Он нужен для аватара **
  - использовать this.baseUrl в методах класса Api;
  ** Исправил **
  - не создавать лишние обертки из анонимных функций в методах класса Api;
  ** Исправил **
  - использовать геттеры и сеттеры для достпуа к внутренним свойствам классов;
  ** Исправил **
  - в конструкторе FormValidator принимать errors;
  ** Исправил **
  - в setAttribute вторым аргументом передавать строку;
  ** Исправил **
  - не использовать присвоение в return'е;
  ** Исправил **
  - разбить OnloadEffects на два класса;
  ** Исправил **
  - в классах попапов с формами много похожей логики, возможно, стоит вынести этот код в один общий класс,
  например FormPopup, и от него наследовать конкретные попапы;
  ** Не совсем понял( Получается можно сделать: popupEdit наследуется от popupForm, который в свою очередь наследуется
  от popup? ) **
  - пересмотреть подход к передаче зависимостей в классы, в некоторых местах оптимальней
  вместо передачи нескольких функций/экземпляров классов использовать коллбек функцию,
  которую вызывать при каком либо событии, например, нажата кнопка "сохранить",
  а в вызывающем коде в передаваемом коллбэке уже реализовывать логику, которая должна быть выполнена при этом событии.
  ** Тоже не совсем понял про какие зависимости идет речь, это касается только АПИ, или вообще всех функций?
  вынес запросы к серверу из класса юзера и кардЛиста**

  Обратите внимание, что работа принимается только после исправления всех «Надо исправить».

  Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
  - не использовать бэм-элементы в отрыве от своего блока или заменить селектор для поиска форм в js;
  - обернуть код в script.js в IIFE.
  Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при выполнении заданий
  и сдачи проектных и дипломной работы
 */
