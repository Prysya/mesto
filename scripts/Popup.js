class Popup {
  constructor(container) {
    this.container = container;

    this.button = this.container.querySelector("button");
    this.form = this.container.querySelector("form")
  }

  removeErrors() {
    this.form
      .querySelectorAll(".popup__input-error")
      .forEach((error) => (error.textContent = ""));
  }

  popupButtonDisable() {
    this.form.querySelector(".popup__button").setAttribute("disabled", true);
  }
}
