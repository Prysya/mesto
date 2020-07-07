class PopupAvatar extends Popup {
  constructor(container, validator, api) {
    super(container);

    this.validator = validator;
    this.api = api;

    this._form = this.container.querySelector("form");
    this._formButton = this._form.querySelector(".popup__button");
    this._inputLink = this._form.elements.avatar;
  }

  open = () => {
    super.open();

    this._form.reset();
    this._inputLink.focus();

    this.validator();
    this._addAvatarFormListener();
  };

  _addAvatarFormListener = () => {
    this.container.addEventListener("submit", this._submitAvatarForm);
  };

  _submitAvatarForm = (event) => {
    event.preventDefault();

    this._formButton.textContent = "Загрузка...";

    this.api(
      {
        avatar: this._inputLink.value,
      },
      "/avatar",
      this._inputLink.value
    )
      .then(() => {
        this.close();
        this._removeAvatarFormListener();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._formButton.textContent = "Сохранить";
      });
  };

  _removeAvatarFormListener = () => {
    this.container.removeEventListener("submit", this._addAvatarFormListener);
  };
}
