class CardList {
  constructor(container, cardCreate, imagePopup, api, spinner) {
    this.container = container;
    //this.data = data;
    this.cardCreate = cardCreate;
    this.imagePopup = imagePopup;
    this.api = api;
    this.spinner = spinner;
  }

  render() {
    this.api("cards")
      .then((cards) =>
        cards.forEach((card) =>
          this.cardCreate(this.container, card, this.imagePopup)
        )
      )
      .finally(() => this.spinner(false));

  }

  addCard(place) {
    this.cardCreate(this.container, place, this.imagePopup);
  }
}
