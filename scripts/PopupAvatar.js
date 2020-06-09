class PopupAvatar extends Popup {
  constructor(container, userInfo, validator, validatorRemoveEvents, api) {
    super(container);

    this.userInfo = userInfo;
    this.validator = validator;
    this.validatorRemoveEvents = validatorRemoveEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.inputLink = this.form.elements.avatar;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.inputLink.focus();

    this.validator();
    this.avatarPopupAddListener();
  }

  avatarPopupAddListener = () => {
    this.container.addEventListener("submit", this.avatarPopupSubmit);
  };

  avatarPopupSubmit = (event) => {
    event.preventDefault();

    this.form.querySelector(".popup__button").textContent = "Загрузка..."

    this.api({
      avatar: this.inputLink.value,
    }, "/avatar")
      .then(() => {
        this.userInfo.avatar.style.backgroundImage = `url(${this.inputLink.value})`;
      })
      .then(() => {
        this.close();
        this.avatarRemoveListener();
        this.validatorRemoveEvents();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      this.form.querySelector(".popup__button").textContent = "Сохранить"
    })
  };

  avatarRemoveListener = () => {
    this.container.removeEventListener("submit", this.avatarPopupAddListener);
  };
}
