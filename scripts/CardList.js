class CardList {
  constructor(container, data, cardCreate, imagePopup) {
    this.container = container;
    this.data = data;
    this.cardCreate = cardCreate;
    this.imagePopup = imagePopup;
  }

  render() {
    this.data.forEach((item) => {
      this.cardCreate(this.container, item, this.imagePopup);
    });
  }

  addCard(place) {
    this.cardCreate(this.container, place, this.imagePopup);
  }
}
