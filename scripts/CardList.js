class CardList {
  constructor(container, cardsArray, card) {
    this.container = container;
    this.cardsArray = cardsArray;
    this.card = card;
  }

  render() {
    this.container.innerHTML = "";
    this.cardsArray.forEach(data => {
      this.container.appendChild(this.card(data));
    })
  }

  addCard(card) {
    this.cardsArray.push(card);
    this.render();
  }
}
