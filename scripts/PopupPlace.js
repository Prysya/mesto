class PopupPlace extends Popup {
  constructor(container, addCard, validator, validatorRemoveEvents, api) {
    super(container);

    this.addCard = addCard;
    this.validator = validator;
    this.validatorRemoveEvents = validatorRemoveEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.place = this.form.elements.place;
    this.link = this.form.elements.link;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.place.focus();

    this.placePopupAddListener();
    this.validator();
  };

  placePopupSubmit = (event) => {
    event.preventDefault();

    this.form.querySelector(".popup__button").textContent = "Загрузка..."

    this.api(this.place.value, this.link.value)
      .then((data) => {
        this.addCard(data);
      })
      .then(() => {
        this.close();
        this.placePopupRemoveListener();
        this.validatorRemoveEvents();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.form.querySelector(".popup__button").textContent = "+"
      })
  };

  placePopupAddListener = () => {
    this.container.addEventListener("submit", this.placePopupSubmit);
  };

  placePopupRemoveListener = () => {
    this.container.removeEventListener("submit", this.placePopupSubmit);
  };
}
