class PopupImage extends Popup {
  constructor(container) {
    super(container);
  }

  open = (event) => {
    if (event.target.className === "place-card__image") {
      this.container.classList.add("popup_is-opened");

      this.container
        .querySelector(".popup__image")
        .setAttribute(
          `src`,
          `${event.target.style.backgroundImage.slice(5, -2)}`
        );

      this.setEventListeners();
    }
  };

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.removeListeners();
  };

  setEventListeners() {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        this.close();
      }
    })
  }

  removeListeners() {
    this.container
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
  }
}
