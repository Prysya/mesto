class PopupEdit extends Popup {
  constructor(container, validator, api) {
    super(container);

    this.validator = validator;
    this.api = api;

    this._form = this.container.querySelector("form");
    this._formButton = this._form.querySelector(".popup__button");
    this._inputName = this._form.elements.name;
    this._inputJob = this._form.elements.job;
  }

  open = () => {
    super.open();

    this._form.reset();
    this._inputName.focus();

    this.validator();
    this._addEditFormListener();
  };

  _addEditFormListener = () => {
    this.container.addEventListener("submit", this._submitEditForm);
  };

  _submitEditForm = (event) => {
    event.preventDefault();

    this._formButton.textContent = "Загрузка...";

    this.api(
      {
        name: this._inputName.value,
        about: this._inputJob.value,
      },
      ""
    )
      .then((result) => this.setDefaultValue(result.name, result.about))
      .then(() => {
        this.close();
        this._removeEditFormListener();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._formButton.textContent = "Сохранить";
      });
  };

  _removeEditFormListener = () => {
    this.container.removeEventListener("submit", this._submitEditForm);
  };

  setDefaultValue(name, about) {
    this._inputName.defaultValue = name;
    this._inputJob.defaultValue = about;
  }
}
