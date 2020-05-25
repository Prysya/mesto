class Card {
  constructor() {
    this.card = null;
  }

  template(data) {
    const templateString = `
      <div class="place-card">
        <div class="place-card__image" style="background-image: url(${data.placeLink})">
        <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${data.placeName}</h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>
    `;
    const element = document.createElement("div");

    element.insertAdjacentHTML("beforeend", templateString.trim());

    return element.firstChild;
  }

  create(data) {
    this.card = this.template(data);

    this.setListeners();

    return this.card;
  }

  setListeners() {
    this.card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }

  like() {
    this.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.parentNode.parentNode.remove();
  }
}
