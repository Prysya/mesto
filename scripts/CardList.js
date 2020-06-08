class CardList {
  constructor(container, cardCreate, imagePopup, api, spinner, cardDelete) {
    this.container = container;
    this.cardCreate = cardCreate;
    this.imagePopup = imagePopup;
    this.api = api;
    this.spinner = spinner;
    this.cardDelete = cardDelete;
  }

  render = () => {
    this.api("cards")
      .then((cards) =>
        cards.forEach((card) =>
          this.cardCreate(this.container, card, this.imagePopup, this.cardDelete)
        )
      )
      .then(() => this.spinner(false))
      .catch(err => console.log(err))
  }

  addCard = (place) => {
    this.cardCreate(this.container, place, this.imagePopup, this.cardDelete);
  }
}
