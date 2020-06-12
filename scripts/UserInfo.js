/*
  Надо исправить: По условиям задания 8-го спринта, у класса должны быть методы setUserInfo и updateUserInfo.
  -- Исправил --
 */
class UserInfo {
  constructor(userName, userJob, avatar) {
    this.userName = userName;
    this.userJob = userJob;
    this._avatar = avatar;

    this._nameValue = null;
    this._aboutValue = null;
  }

  get nameValue() {
    return this._nameValue;
  }

  set nameValue(value) {
    this._nameValue = value;
  }

  get aboutValue() {
    return this._aboutValue;
  }

  set aboutValue(value) {
    this._aboutValue = value;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(value) {
    this._avatar = value;
  }

  setUserInfo = (name, about) => {
    this.nameValue = name;
    this.aboutValue = about;
  }

  updateUserInfo = () => {
    this.userName.textContent = this.nameValue;
    this.userJob.textContent = this.aboutValue;
  };
}
