class CardList extends Card{
  constructor(container, cardsArray, card) {
    super();

    this.container = container;
    this.cardsArray = cardsArray;
    this.card = card;
  }

  render() {
    this.container.innerHTML = "";
    this.cardsArray.forEach((data) => {
      this.container.appendChild(this.card(data));
    });
  }

  addCard = (data) => {
    this.cardsArray.push(data);
    this.container.appendChild(super.create(data));
  }
}
