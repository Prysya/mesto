class Card {
  constructor(container, data, imagePopup) {
    this.container = container;
    this.data = data;
    this.imagePopup = imagePopup;

    this._card = null;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
  }

  template() {
    const templateString = `
      <div class="place-card">
        <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>
    `;
    const element = document.createElement("div");

    element.insertAdjacentHTML("beforeend", templateString.trim());

    return element.firstChild;
  }

  create() {
    this._card = this.template();

    this._card.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${this.data.link})`;
    this._card.querySelector(
      ".place-card__name"
    ).textContent = this.data.name;

    this.setListeners();

    this.container.appendChild(this._card);
  }

  setListeners() {
    this._card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this._card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
    this._card
      .querySelector(".place-card__image")
      .addEventListener("click", this.imagePopup);
  }

  like() {
    this._card
      .querySelector(".place-card__like-icon")
      .classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.removeListeners();
    this._card.remove();
    this._card = null;
  }

  removeListeners() {
    this._card
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this._card
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);
    this._card
      .querySelector(".place-card__image")
      .removeEventListener("click", this.imagePopup);
  }
}
