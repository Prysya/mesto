class UserInfo {
  constructor(userInfoDom) {
    this.userInfoDom = userInfoDom;
    /**
     * Надо исправить:
     * Не использовать глобальные переменные.
     * Вместо этого слеует передать элементы в параметры конструктора.
     *
     * Исправил
     */

    this.userName = this.userInfoDom.querySelector(".user-info__name");
    this.userJob = this.userInfoDom.querySelector(".user-info__job");
  }

  setUserInfo(userName, userJob) {
    this.userNameValue = userName;
    this.userJobValue = userJob;
    /**
     * Можно лучше:
     * Объединиь в одну функцию, т.к. отдельно они не вызываются
     *
     * Исправил
     */
    this.userName.textContent = this.userNameValue;
    this.userJob.textContent = this.userJobValue;
  }
}
