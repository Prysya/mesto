import Popup from "./Popup.js";

export default class PopupPlace extends Popup {
  constructor(container, validator, api) {
    super(container);

    this.validator = validator;
    this.api = api;

    this._form = this.container.querySelector("form");
    this._formButton = this._form.querySelector(".popup__button");
    this._place = this._form.elements.place;
    this._link = this._form.elements.link;
  }

  open = () => {
    super.open();

    this._form.reset();
    this._place.focus();

    this._addPlaceFormListener();
    this.validator();
  };

  _submitPlaceForm = (event) => {
    event.preventDefault();

    this._formButton.textContent = "Загрузка...";

    this.api(this._place.value, this._link.value)
      .then(() => {
        this.close();
        this._removePlaceFormListener();
      })
      .catch((err) => console.log(err))
      .finally(() => (this._formButton.textContent = "+"));
  };

  _addPlaceFormListener = () => {
    this.container.addEventListener("submit", this._submitPlaceForm);
  };

  _removePlaceFormListener = () => {
    this.container.removeEventListener("submit", this._submitPlaceForm);
  };
}
