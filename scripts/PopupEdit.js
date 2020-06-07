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

    this.inputName.defaultValue = this.userInfo.userName.textContent;
    this.inputJob.defaultValue = this.userInfo.userJob.textContent;

   // this.api("Jack", "qustou").then(result => console.log(result))
  }

  open = () => {
    super.open();

    this.form.reset();
    this.inputName.focus();

    this.validator();
    this.editPopupAddListener();
  }

  editPopupAddListener = () => {
    this.container.addEventListener("submit", this.editPopupSubmit);
  };

  editPopupSubmit = (event) => {
    event.preventDefault();

    this.userInfo.setUserInfo(this.inputName.value, this.inputJob.value);

    this.inputName.defaultValue = this.inputName.value;
    this.inputJob.defaultValue = this.inputJob.value;

    this.close();
    this.editRemoveListener();
    this.validatorRemoveEvents();
  };

  editRemoveListener = () => {
    this.container.removeEventListener("submit", this.editPopupSubmit);
  };
}
