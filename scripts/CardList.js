class CardList {
  constructor(container, createCardNode) {
    this.container = container;
    this.createCardNode = createCardNode;
  }

  /*
    Надо исправить: Метод render должен отображать на странице начальный массив карточек,
    которые переданы либо в конструктор, либо в сам метод. Откуда берутся эти карточки методу не должно быть дела,
    хоть из массива из js-файла, хоть с сервера.
    -- Исправил --
   */
  render = (cardArray) => cardArray.forEach((place) => this.addCard(place));
  /*
    Надо исправить: Метод должен добавлять dom-элемент карточки в контейнер со всеми карточками.
    Здесь же вызывается коллбэк, в который передаются множество переменных, которые принимаются в конструкторе,
    но они итак доступны в файле script.js.
    -- Исправил --
   */
  addCard = (place) => this.container.appendChild(this.createCardNode(place));
}
