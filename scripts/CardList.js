class CardList {
  constructor(container, createCardNode) {
    this.container = container;
    this.createCardNode = createCardNode;
  }

  render = (cardArray) => cardArray.forEach((place) => this.addCard(place));

  addCard = (place) => this.container.appendChild(this.createCardNode(place));
}
