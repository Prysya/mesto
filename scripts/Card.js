/*
Card
Это класс, создающий карточку. Добавьте ему методы constructor, like и remove.
И ещё один — create. Он будет создавать DOM-элемент карточки.
 */

class Card {
  constructor(data) {
    this.data = data;
  }
  like() {
    this.classList.toggle("place-card__like-icon_liked");
  }
  remove(event) {
    this.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
  create() {
    `<div class="place-card">
      <div
        class="place-card__image"
        style="background-image: url(${this.data.placeLink})"
      >
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${this.data.placeName}</h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>;
  `;
  }
}

/*
const like = (event) => {
  if (event.target.classList.contains("place-card__like-icon")) {
    return event.target.classList.toggle("place-card__like-icon_liked");
  }
  return false;
};

const deleteImage = (event) => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    return event.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
  return false;
};

const addImageStyle = (event) => {
  const popupImage = document.querySelector(".popup__image");

  popupImage.style = event.target.attributes.style.value;
};
*/

