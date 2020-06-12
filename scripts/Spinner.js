/*
  Можно лучше: Данный класс можно разбить на два, так как он имеет два несвязанных метода,
  используемых для разных целей.
  -- Исправил --
 */
class Spinner {
  constructor(container) {
    this.container = container;
  }

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  handleSpinner = (isLoading) => {
    if (isLoading) {
      this.container.classList.add("spinner_visible");
    } else {
      this.container.classList.remove("spinner_visible");
    }
  };


}
