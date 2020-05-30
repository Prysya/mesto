class CardList extends Card {
  constructor(container, data, imagePopup) {
    super(container, data, imagePopup);

    this.container = container;
    this.data = data;
  }

  render() {
    this.data.forEach((item) => {
      new CardList(this.container, item, this.imagePopup).create();
    });
  }

  addCard(place) {
    this.data.push(place);
    new CardList(this.container, place, this.imagePopup).create();
  }
}
