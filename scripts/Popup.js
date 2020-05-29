class Popup {
  constructor(container) {
    this.container = container;

    this.button = this.container.querySelector("button");
    this.form = this.container.querySelector("form")
  }

  buttonActivate() {
    this.button.classList.remove("popup__button_disabled");
  }

  buttonDisable() {
    this.button.classList.add("popup__button_disabled");
  }
}
