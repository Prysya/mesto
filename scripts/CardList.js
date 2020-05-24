/* CardList
Это класс для хранения и отрисовки карточек. Метод constructor этого класса должен принимать два аргумента:

    - DOM-элемент — контейнер, куда нужно складывать карточки;
    - массив карточек, которые будут на странице при загрузке.

Ещё у класса CardList должно быть два метода:

   - addCard для добавления карточки в список, принимает на вход экземпляр карточки;
   - render для отрисовки карточек при загрузке страницы.

 */

class CardList {
  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
  }

  render(cardItem) {
    this.container.insertAdjacentHTML("beforeend", cardItem);
  }

  onloadRender() {
    this.cards.forEach(card => this.render(card));
  }

  addCard(card) {
    this.cards.push(card);
    this.render(card);
  }
}
