export default class Popup {
  constructor(container) {
    this.container = container;
  }

  open() {
    this.container.classList.add("popup_is-opened");

    this.setEventListeners();
  }

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.removeListeners();
  };

  setEventListeners = () => {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    document.addEventListener("keydown", this.closeEsc);
  };

  removeListeners = () => {
    this.container
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
    document.removeEventListener("keydown", this.closeEsc);
  };

  closeEsc = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
