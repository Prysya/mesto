class UserInfo {
  constructor() {
    this._userNameDom = document.querySelector(".user-info__name");
    this._userJobDom = document.querySelector(".user-info__job");

    this.userNameValue = this._userNameDom.textContent;
    this.userJobValue = this._userJobDom.textContent;
  }
  setUserInfo(userName, userJob) {
    this.userNameValue = userName;
    this.userJobValue = userJob;

    this.updateUserInfo();
  }

  updateUserInfo() {
    this._userNameDom.textContent = this.userNameValue;
    this._userJobDom.textContent = this.userJobValue;
  }
}