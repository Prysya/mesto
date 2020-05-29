// Переменная с DOM элементом данных пользователя
const userInfoDom = document.querySelector(".user-info__data");




// Данные пользователя Имя, Работа
const userInfo = new UserInfo(userInfoDom);


const popupEdit = new PopupEdit(document.querySelector(".popup_type_edit"), userInfo);

const popupPlace = new PopupPlace(document.querySelector(".popup_type_place"));













//------------------------ DELETE -------------------------------------------

document.querySelector(".user-info__edit").addEventListener("click", popupEdit.open);
document.querySelector(".user-info__button").addEventListener("click", popupPlace.open);


//---------------------------------------------------------------------


const card = new Card();
const cardCreate = (data) => card.create(data);

const cardList = new CardList(
  document.querySelector(".places-list"),
  initialCards,
  cardCreate
);
// const addCard = (card) => cardList.addCard(card);
//
// const userInfo = new UserInfo();
// const setUserInfo = (userName, userJob) =>
//   userInfo.setUserInfo(userName, userJob);
//
// const formValidator = new FormValidator();
// const validation = (event) => formValidator.validation(event);
//
// const popupEdit = new PopupEdit(document.querySelector(".popup_type_edit"));

// const popup = new Popup(
//   document.querySelector(".popup"),
//   addCard,
//   validation,
//   setUserInfo
// );

// document.querySelector(".user-info__edit").addEventListener("click", () => {
//   popup.open(popupEditOptions);
//   popup.editEventListeners();
//   popup.returnUserValues();
// });
// document.querySelector(".user-info__button").addEventListener("click", () => {
//   popup.open(popupPlaceOptions);
//   popup.placesEventListeners();
//   document
//     .querySelector(".popup__button")
//     .classList.add("popup__button_disabled");
// });
// document.querySelector(".places-list").addEventListener("click", (event) => {
//   if (event.target.className.includes("place-card__image")) {
//     popup.imagePopupRender(event.target.attributes.style.nodeValue);
//   }
// });

cardList.render();

/**
 * Хорошая работа, теперь код разбит на модули.
 *
 * Надо исправить:
 * 1. Упростить работу с попапами.
 *    Необходимо перенести разметку в HTML. Так как операции над DOM (вставка и удаление элементов) являются
 *    "дорогими" для бразуера и снижают производительность.
 *    Помимо этого объект класса Popup_old должен управлять только одним попапом.
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
 *
 * 5. Не использовать глобальные переменные (в том числе, поиск по document)
 *    Следует передавать их параметрами в метод либо конструктор.
 *    Допустимо использование document.createElement и поиск элементов внутри полей
 *    (например, this.card.querySelector...)
 *
 *
 * 6. Аналогично Popup, для каждой формы должен быть свой FormValidator.
 *    Лучше всего передать ссылку на элемент формы в конструктор и использовать this.form
 *    Чтобы this работал корректно, следует использовать либо стрелочную функцию, либо
 *    привязять нужный контекст с помощью bind.
 *    Подробнее: https://learn.javascript.ru/bind
 *
 *
 * 7. Сделать код в FirmValidator масштабируемым.
 *
 * Можно лучше:
 * 1. Перенести script.js и initialCards.js в папку scripts
 * --Исправил--
 *
 * Внимание: работа принимается при исправлении всех замечаний с пометкой "Надо исправить"
 * Обращаю ваше внимание на то, что в данный момент требуются достаточно большие изменения в коде, поэтому
 * в следующих проверках не исключено появление новых замечаний, о которых не было указано ранее.
 */