class CardList {
  constructor(
    container,
    cardCreate,
    imagePopup,
    api,
    spinner,
    cardRequests,
    owner
  ) {
    this.container = container;
    this.cardCreate = cardCreate;
    this.imagePopup = imagePopup;
    this.api = api;
    this.spinner = spinner;
    this.cardRequests = cardRequests;
    this.owner = owner;
  }

  render = () => {
    this.api("cards")
      .then((cards) =>
        cards.forEach((card) =>
          this.cardCreate(
            this.container,
            card,
            this.imagePopup,
            this.cardRequests,
            this.owner
          )
        )
      )
      .then(() => this.spinner(false))
      .catch((err) => console.log(err));
  };

  addCard = (place) => {
    this.cardCreate(
      this.container,
      place,
      this.imagePopup,
      this.cardRequests,
      this.owner
    );
  };
}
