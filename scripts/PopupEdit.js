class PopupEdit extends Popup {
  constructor(container, userInfo, validator, validatorRemoveEvents, api) {
    super(container);

    this.userInfo = userInfo;
    this.validator = validator;
    this.validatorRemoveEvents = validatorRemoveEvents;
    this.api = api;

    this.form = this.container.querySelector("form");
    this.inputName = this.form.elements.name;
    this.inputJob = this.form.elements.job;
  }

  open = () => {
    super.open();

    this.form.reset();
    this.inputName.focus();

    this.inputName.defaultValue = this.userInfo.userName.textContent;
    this.inputJob.defaultValue = this.userInfo.userJob.textContent;

    this.validator();
    this.editPopupAddListener();
  }

  editPopupAddListener = () => {
    this.container.addEventListener("submit", this.editPopupSubmit);
  };

  editPopupSubmit = (event) => {
    event.preventDefault();

    this.api(this.inputName.value, this.inputJob.value)
      .then((result) => {
        this.form.querySelector(".popup__button").textContent = "Загрузка..."

        this.inputName.defaultValue = this.inputName.value;
        this.inputJob.defaultValue = this.inputJob.value;

        this.userInfo.userName.textContent = result.name;
        this.userInfo.userJob.textContent = result.about;
      })
      .then(() => {
        this.close();
        this.editRemoveListener();
        this.validatorRemoveEvents();
      })
      .catch((err) => console.log(err))
      .finally(() => {
      this.form.querySelector(".popup__button").textContent = "Сохранить"
    })



  };

  editRemoveListener = () => {
    this.container.removeEventListener("submit", this.editPopupSubmit);
  };
}
