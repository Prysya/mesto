class UserInfo {
  constructor(userName, userJob) {
    this.userName = userName;
    this.userJob = userJob;
  }

  setUserInfo(userNameValue, userJobValue) {
    this.userName.textContent = userNameValue;
    this.userJob.textContent = userJobValue;
  }
}
