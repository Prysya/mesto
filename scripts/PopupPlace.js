class PopupPlace extends Popup {
  constructor(container, addCard, validator) {
    super(container);

    this.validator = validator;
    this.addCard = addCard;
  }

  open = () => {
    this.container.classList.add("popup_is-opened");

    this.removeErrors();
    this.popupButtonDisable();

    this.place = this.form.elements.place;
    this.link = this.form.elements.link;

    this.place.focus();

    this.validator();
    this.setEventListeners();
  };

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.removeListeners();
    this.form.reset();
  };

  setEventListeners = () => {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    this.container.addEventListener("submit", this.submit);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  };

  submit = (event) => {
    event.preventDefault();

    this.addCard({ placeName: this.place.value, placeLink: this.link.value });

    this.close();
  };

  removeListeners() {
    this.container
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
    this.container.removeEventListener("submit", this.submit);
  }
}
