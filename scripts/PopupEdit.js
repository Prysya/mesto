class PopupEdit extends Popup {
  constructor(container, updateUserInfo, validator, removeValidatorEvents, api) {
    super(container);

    this.updateUserInfo = updateUserInfo;
    this.validator = validator;
    this.removeValidatorEvents = removeValidatorEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.formButton = this.form.querySelector(".popup__button");
    this.inputName = this.form.elements.name;
    this.inputJob = this.form.elements.job;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.inputName.focus();

    this.validator(true);
    this.addEditFormListener();
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  addEditFormListener = () => {
    this.container.addEventListener("submit", this.submitEditForm);
  };

  /*
    Можно лучше: Название функции должно начинаться с глагола, отражая то действие, которое функция выполняет.
    Далее описываются элементы, к которым действие относится.
    Например, const handleLikeButton = () => {}. Такая функция будет отражать обработчик событий для кнопки лайка.
    -- Исправил --
   */
  submitEditForm = (event) => {
    event.preventDefault();

    this.formButton.textContent = "Загрузка...";

    this.api(
      {
        name: this.inputName.value,
        about: this.inputJob.value,
      },
      ""
    )
      .then((result) => {
        /*
          Надо исправить: Исходя из задания 8-го спринта, обновление информации на странице
          должно происходить через методы setUserInfo и updateUserInfo класса UserInfo.
          -- Исправил --
         */
        this.setDefaultValue(result.name, result.about)
        this.updateUserInfo(result.name, result.about);

      })
      .then(() => {
        this.close();
        this.removeEditFormListener();
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
  removeEditFormListener = () => {
    this.container.removeEventListener("submit", this.submitEditForm);
  };

  setDefaultValue(name, about){
    this.inputName.defaultValue = name;
    this.inputJob.defaultValue = about;
  }
}
