class PopupPlace extends Popup {
  constructor(container, addCard, validator, removeValidatorEvents, api) {
    super(container);

    this.addCard = addCard;
    this.validator = validator;
    this.removeValidatorEvents = removeValidatorEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.formButton = this.form.querySelector(".popup__button");
    this.place = this.form.elements.place;
    this.link = this.form.elements.link;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.place.focus();

    this.addPlaceFormListener();
    this.validator(false);
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  submitPlaceForm = (event) => {
    event.preventDefault();

    this.formButton.textContent = "Загрузка...";

    this.api(this.place.value, this.link.value)
      .then((data) => {
        this.addCard(data);
      })
      .then(() => {
        this.close();
        this.removePlaceFormListener();
        this.removeValidatorEvents();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        /*
          Надо исправить: Dom-элемент не должен искаться дважды, это лишняя работа,
          которую легко можно избежать, используя переменную для dom-элемента.
          -- Исправил --
         */
        this.formButton.textContent = "+";
      });
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  addPlaceFormListener = () => {
    this.container.addEventListener("submit", this.submitPlaceForm);
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  removePlaceFormListener = () => {
    this.container.removeEventListener("submit", this.submitPlaceForm);
  };
}
