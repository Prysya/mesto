class PopupPlace extends Popup {
  constructor(container) {
    super(container);
  }

  open = () => {
    this.container.classList.add("popup_is-opened");

    this.buttonDisable();
    this.setEventListeners();
  };

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.form.reset();
  };

  setEventListeners = () => {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    this.container.addEventListener("submit", this.submit);
  };
}
