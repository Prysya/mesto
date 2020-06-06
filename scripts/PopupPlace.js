class PopupPlace extends Popup {
  constructor(container, addCard, validator, validatorRemoveEvents) {
    super(container);

    this.addCard = addCard;
    this.validator = validator;
    this.validatorRemoveEvents = validatorRemoveEvents;

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

    this.addCard({ placeName: this.place.value, placeLink: this.link.value });

    this.close();
    this.placePopupRemoveListener();
    this.validatorRemoveEvents();
  };

  placePopupAddListener = () => {
    this.container.addEventListener("submit", this.placePopupSubmit);
  };

  placePopupRemoveListener = () => {
    this.container.removeEventListener("submit", this.placePopupSubmit);
  };
}
