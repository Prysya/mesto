class PopupImage extends Popup {
  open(url) {
    /*
      Можно лучше: Шаблонная строка здесь не нужна, можно сразу передать url вторым параметром в setAttribute.
      -- Исправил --
     */
    this.container.querySelector(".popup__image").setAttribute(`src`, url);

    super.open();
  }
}
