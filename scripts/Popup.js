/* Popup
Это класс для всплывающего окна. Добавьте ему методы open и close, чтобы показывать и скрывать попап.
 Есть два подхода, как можно реализовать всплывающие окна:

    сделать единый контейнер для всех попапов и менять его содержимое при открытии;
    сделать независимые попапы в разных контейнерах.

Первый способ одновременно лучше и сложнее. Но вы сами можете выбрать, как реализовать попап.

 */

class Popup {
  constructor(container, addCard) {
    this.container = container;
    this.addCard = addCard;

    this.close = this.close.bind(this);
  }

  render(options) {
    return `<div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">${options.popupTitle}</h3>
    <form class="form popup__form" name="${options.formName}" novalidate>
      <input
        type="${options.inputFirstType}"
        name="${options.inputFirstName}"
        class="popup__input popup__input_type_name"
        placeholder="${options.inputFirstPlaceholder}"
        minlength=${options.inputFirstMinlength}
        maxlength=${options.inputFirstMaxlength}
        required
      />
      <p class="popup__input-error" id="${options.inputFirstName}"></p>
      <input
        type="${options.inputSecondType}"
        name="${options.inputSecondName}"
        class="popup__input popup__input_type_link-url"
        placeholder="${options.inputSecondPlaceholder}"
        minlength=${options.inputSecondMinlength}
        maxlength=${options.inputSecondMaxlength}
        required
      />
      <p class="popup__input-error" id="${options.inputSecondName}"></p>
      <button type="submit" name="submit" class="button popup__button">
        ${options.buttonValue}
      </button>
    </form>
  </div>`;
  }

  renderImage(link) {
    return `
      <div class="popup__image" style="background-image: url(${link})">
        <img
          src="./images/close.svg"
          alt=""
          class="popup__close popup__close_image"
        />
      </div>
    `
  }

  open(options) {
    this.container.classList.add("popup_is-opened");
    this.container.insertAdjacentHTML("afterbegin", this.render(options));
    this.addEventListeners();
    this.container.querySelector(".popup__input_type_name").focus();
  }

  close() {
    this.container.classList.remove("popup_is-opened");
    this.container.innerHTML = "";
  }

  editValuesLoad() {
    this.editName = document.forms.edit.elements.editName;
    this.editAbout = document.forms.edit.elements.editAbout;

    this.userName = document.querySelector(".user-info__name");
    this.userJob = document.querySelector(".user-info__job");

    this.editName.value = this.userName.innerText;
    this.editAbout.value = this.userJob.innerText;
  }

  editValuesRender() {
    this.userName.innerText = this.editName.value;
    this.userJob.innerText = this.editAbout.value;
  }

  returnImageValues() {
    this.placeName = document.forms.place.elements.placeName;
    this.placeLink = document.forms.place.elements.placeLink;

    return { placeName: this.placeName.value, placeLink: this.placeLink.value };
  }

  addEventListeners() {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);

    if (Boolean(document.forms.edit)) {
      document.forms.edit.addEventListener("input", () => {
        formValidator.validationEdit();
      });

      this.container.addEventListener("submit", (event) => {
        event.preventDefault();

        if (this.editName.validity.valid && this.editAbout.validity.valid) {
          this.editValuesRender();
          this.close();
        }
      });
    }

    if (Boolean(document.forms.place)) {
      document.forms.place.addEventListener("input", (event) => {
        formValidator.validationPlace(event);
      });

      this.container.addEventListener("submit", (event) => {
        event.preventDefault();

        if (
          document.forms.place.placeName.validity.valid &&
          document.forms.place.placeLink.validity.valid
        ) {
          this.addCard(this.returnImageValues());
          this.close();
        }
      });
    }
  }
}
