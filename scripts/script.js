// Данные пользователя Имя, Работа
const userInfo = new UserInfo(document.querySelector(".user-info__data"));

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
const popupImageOpen = (event) => popupImage.open(event);

// Попап с формой редактирования профиля
const popupEdit = new PopupEdit(
  document.querySelector(".popup_type_edit"),
  userInfo,
  editFormValidator._setEventListeners
);

// Класс создания добавления и рендера карточек
const cardList = new CardList(
  document.querySelector(".places-list"),
  initialCards,
  popupImageOpen
);

// Функция добавления карточки на страницу
const cardAdd = (place) => cardList.addCard(place);

// Попап с формой добавления карточки
const popupPlace = new PopupPlace(
  document.querySelector(".popup_type_place"),
  cardAdd,
  placeFormValidator._setEventListeners
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

/**
 * Хорошая работа, теперь код разбит на модули.
 *
 * Надо исправить:
 * 1. Упростить работу с попапами.
 *    Необходимо перенести разметку в HTML. Так как операции над DOM (вставка и удаление элементов) являются
 *    "дорогими" для бразуера и снижают производительность.
 *    Помимо этого объект класса Popup должен управлять только одним попапом.
 *    --Исправил--
 *
 * 2. Небезопасное добавление данных: если в название написать "123<br>456", то HTML не экранируется.
 *    Необходимо сначала создать элемент из строки, затем в нем заменить значение с помощью textContent
 *    --Исправил--
 *
 * 3. Баг: если добавить новую карточку, то пропадут лайки и восстановятся ранее удаленные карточки.
 *    Необходимо вместо повторного рендера выполнять вставку одной карточки с помощью appendChild.
 *    --Исправил--
 *
 * 4. Для каждой карточки должен создаваться новый объект класса Card. (в cardCreate)
 *    --Исправил--
 *
 * 5. Не использовать глобальные переменные (в том числе, поиск по document)
 *    Следует передавать их параметрами в метод либо конструктор.
 *    Допустимо использование document.createElement и поиск элементов внутри полей
 *    (например, this.card.querySelector...)
 *    --Исправил--
 *
 *
 * 6. Аналогично Popup, для каждой формы должен быть свой FormValidator.
 *    Лучше всего передать ссылку на элемент формы в конструктор и использовать this.form
 *    Чтобы this работал корректно, следует использовать либо стрелочную функцию, либо
 *    привязять нужный контекст с помощью bind.
 *    Подробнее: https://learn.javascript.ru/bind
 *    -- Исправил --
 *
 *
 * 7. Сделать код в FirmValidator масштабируемым.
 * -- Исправил --
 *
 * Можно лучше:
 * 1. Перенести script.js и initialCards.js в папку scripts
 * --Исправил--
 *
 * Внимание: работа принимается при исправлении всех замечаний с пометкой "Надо исправить"
 * Обращаю ваше внимание на то, что в данный момент требуются достаточно большие изменения в коде, поэтому
 * в следующих проверках не исключено появление новых замечаний, о которых не было указано ранее.
 */
