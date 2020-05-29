class PopupEdit extends Popup {
  constructor(container, userInfo) {
    super(container);

    this.userInfo = userInfo;
  }

  open = () => {
    this.container.classList.add("popup_is-opened");

    this.inputName = this.form.elements.name;
    this.inputJob = this.form.elements.job;

    this.inputName.focus();

    this.inputName.value = this.userInfo.userName.textContent;
    this.inputJob.value = this.userInfo.userJob.textContent;

    this.setEventListeners();
  };

  close = () => {
    this.container.classList.remove("popup_is-opened");
    this.removeEventListeners();
  };

  setEventListeners = () => {
    this.container
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
    this.container.addEventListener("submit", this.submit);
  };

  submit = (event) => {
    event.preventDefault();

    this.userInfo.setUserInfo(this.inputName.value, this.inputJob.value);

    this.removeEventListeners();
    this.close();
  };

  removeEventListeners = () => {
    this.container
      .querySelector(".popup__close")
      .removeEventListener("click", this.close);
    this.container.removeEventListener("submit", this.submit);
  };
}
