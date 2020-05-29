class Popup_old {
  constructor(container, addCard, validation) {
    this.container = container;
    this.addCard = addCard;
    this.validation = validation;
    this.setUserInfo = setUserInfo;

    this._form = null;
    this._firstInput = null;
    this._secondInput = null;

    this._close = this._close.bind(this);
    this.popupCloseEsc = this.popupCloseEsc.bind(this);
  }

  _render(options) {
    return `<div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">${options.popupTitle}</h3>
    <form class="form popup__form" name="popup" novalidate>
      <input
        type="${options.inputFirstType}"
        name="firstInput"
        class="popup__input popup__input_type_name"
        placeholder="${options.inputFirstPlaceholder}"
        minlength=${options.inputFirstMinlength}
        maxlength=${options.inputFirstMaxlength}
        required
      />
      <p class="popup__input-error" id="firstInput"></p>
      <input
        type="${options.inputSecondType}"
        name="secondInput"
        class="popup__input popup__input_type_link-url"
        placeholder="${options.inputSecondPlaceholder}"
        minlength=${options.inputSecondMinlength}
        maxlength=${options.inputSecondMaxlength}
        required
      />
      <p class="popup__input-error" id="secondInput"></p>
      <button type="submit" name="submit" class="button popup__button">
        ${options.buttonValue}
      </button>
    </form>
  </div>`;
  }

  // _render(options) {
  //   return `
  //   <form class="form popup__form" name="popup" novalidate>
  //     <input
  //       type="${options.inputFirstType}"
  //       name="firstInput"
  //       class="popup__input popup__input_type_name"
  //       placeholder="${options.inputFirstPlaceholder}"
  //       minlength=${options.inputFirstMinlength}
  //       maxlength=${options.inputFirstMaxlength}
  //       required
  //     />
  //     <p class="popup__input-error" id="firstInput"></p>
  //     <input
  //       type="${options.inputSecondType}"
  //       name="secondInput"
  //       class="popup__input popup__input_type_link-url"
  //       placeholder="${options.inputSecondPlaceholder}"
  //       minlength=${options.inputSecondMinlength}
  //       maxlength=${options.inputSecondMaxlength}
  //       required
  //     />
  //     <p class="popup__input-error" id="secondInput"></p>
  //     <button type="submit" name="submit" class="button popup__button">
  //       ${options.buttonValue}
  //     </button>
  //   </form>
  // </div>`;
  // }

  _imagePopupTemplate(data) {
    return `
      <div class="popup__image" style="${data}">
        <img
          src="./images/close.svg"
          alt=""
          class="popup__close popup__close_image"
        />
      </div>
    `;
  }

  imagePopupRender(data) {
    this.container.classList.add("popup_is-opened");
    //this.container.querySelector(".popup__image").classList.remove("popup__image_disabled");
    this.container.querySelector(".popup__content").classList.add("popup__image");

    console.log(this.container.querySelector(".popup__image"));
    //this.container.insertAdjacentHTML("afterbegin", this._imagePopupTemplate(data));

    this._addEventListeners();
  }

  open(options) {
    this.container.classList.add("popup_is-opened");
    this.container.insertAdjacentHTML("afterbegin", this._render(options));

    this._form = document.forms.popup;
    this._firstInput = this._form.elements.firstInput;
    this._secondInput = this._form.elements.secondInput;

    this._addEventListeners();
    this._addValidationListeners();
    this._firstInput.focus();
  }

  _close() {
    this.container.classList.remove("popup_is-opened");
    this._form.reset();

    this._removeEventListeners();
  }

  returnImageValues() {
    return {
      placeName: this._firstInput.value,
      placeLink: this._secondInput.value,
    };
  }

  returnUserValues() {
    this._firstInput.value = document.querySelector(
      ".user-info__name"
    ).textContent;
    this._secondInput.value = document.querySelector(
      ".user-info__job"
    ).textContent;
  }

  _addEventListeners() {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this._close, true);
    document.addEventListener("keydown", this.popupCloseEsc, true);
  }

  _addValidationListeners() {
    this._form.addEventListener("input", this.validation, false);
    this._form.addEventListener("submit", this.validation);
  }

  placesEventListeners() {
    this._form.addEventListener("submit", () => {
      if (this._firstInput.validity.valid && this._secondInput.validity.valid) {
        this.addCard(this.returnImageValues());
        this._close();
      }
    }, true);
  }

  editEventListeners() {
    this._form.addEventListener("submit", () => {
      if (this._firstInput.validity.valid && this._secondInput.validity.valid) {
        this.setUserInfo(this._firstInput.value, this._secondInput.value);
        this._close();
      }
    }, true);
  }

  popupCloseEsc(event) {
    if (event.key === "Escape") {
      this._close();
    }
  }

  _removeEventListeners() {
    if(!!this._form) {
      this._form.removeEventListener("input", this.validation);
      this._form.removeEventListener("submit", this.validation);
    }
  }
}
