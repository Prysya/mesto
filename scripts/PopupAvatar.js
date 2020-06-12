class PopupAvatar extends Popup {
  constructor(container, userInfo, validator, removeValidatorEvents, api) {
    super(container);

    this.userInfo = userInfo;
    this.validator = validator;
    this.removeValidatorEvents = removeValidatorEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.formButton = this.form.querySelector(".popup__button");
    this.inputLink = this.form.elements.avatar;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.inputLink.focus();

    this.validator(false);
    this.addAvatarFormListener();
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  addAvatarFormListener = () => {
    this.container.addEventListener("submit", this.submitAvatarForm);
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  submitAvatarForm = (event) => {
    event.preventDefault();

    this.formButton.textContent = "Загрузка...";

    this.api(
      {
        avatar: this.inputLink.value,
      },
      "/avatar"
    )
      .then(() => {
        this.userInfo.avatar.style.backgroundImage = `url(${this.inputLink.value})`;
      })
      .then(() => {
        this.close();
        this.removeAvatarFormListener();
        this.removeValidatorEvents();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        /*
          Надо исправить: Dom-элемент не должен искаться дважды, это лишняя работа,
          которую легко можно избежать, используя переменную для dom-элемента.
          -- Исправил --
         */
        this.formButton.textContent = "Сохранить";
      });
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  removeAvatarFormListener = () => {
    this.container.removeEventListener("submit", this.addAvatarFormListener);
  };
}
