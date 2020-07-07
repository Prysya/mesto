class UserInfo {
  constructor(userNameDom, userJobDom, avatar) {
    this.userNameDom = userNameDom;
    this.userJobDom = userJobDom;
    this._avatar = avatar;

    this._userName = null;
    this._userAbout = null;
  }

  get userName() {
    return this._userName;
  }

  set userName(value) {
    this._userName = value;
  }

  get userAbout() {
    return this._userAbout;
  }

  set userAbout(value) {
    this._userAbout = value;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(value) {
    this._avatar = value;
  }

  updateUserInfo = () => {
    this.userNameDom.textContent = this.userName;
    this.userJobDom.textContent = this.userAbout;
  };
}
