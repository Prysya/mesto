/* Popup
Это класс для всплывающего окна. Добавьте ему методы open и close, чтобы показывать и скрывать попап.
 Есть два подхода, как можно реализовать всплывающие окна:

    сделать единый контейнер для всех попапов и менять его содержимое при открытии;
    сделать независимые попапы в разных контейнерах.

Первый способ одновременно лучше и сложнее. Но вы сами можете выбрать, как реализовать попап.

 */

class Popup {
  static popup = document.querySelector(".popup");

  constructor(options) {
    this.options = options;
  }

  open() {
    const {
      popupTitle,
      formName,
      inputFirstType,
      inputFirstName,
      inputFirstPlaceholder,
      inputFirstMinlength,
      inputFirstMaxlength,
      inputSecondType,
      inputSecondName,
      inputSecondPlaceholder,
      inputSecondMinlength,
      inputSecondMaxlength,
      buttonValue,
    } = this.options;

    popup.insertAdjacentHTML("afterend", `<div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">${popupTitle}</h3>
    <form class="form popup__form" name="${formName}" novalidate>
      <input
        type="${inputFirstType}"
        name="${inputFirstName}"
        class="popup__input popup__input_type_name"
        placeholder="${inputFirstPlaceholder}"
        minlength=${inputFirstMinlength}
        maxlength=${inputFirstMaxlength}
        required
      />
      <p class="popup__input-error" id="${inputFirstName}"></p>
      <input
        type="${inputSecondType}"
        name="${inputSecondName}"
        class="popup__input popup__input_type_link-url"
        placeholder="${inputSecondPlaceholder}"
        minlength=${inputSecondMinlength}
        maxlength=${inputSecondMaxlength}
        required
      />
      <p class="popup__input-error" id="${inputSecondName}"></p>
      <button type="submit" name="submit" class="button popup__button">
        ${buttonValue}
      </button>
    </form>
  </div>`);
  }
  close() {}
}
