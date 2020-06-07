class UserInfo {
  constructor(userName, userJob, avatar, api, blur) {
    this.userName = userName;
    this.userJob = userJob;
    this.avatar = avatar;
    this.api = api;
    this.blur = blur;
  }

  getUserInfo() {
    this.api("users/me")
      .then((result) => {
        this.avatar.style.backgroundImage = `url(${result.avatar})`;
        this.userName.textContent = result.name;
        this.userJob.textContent = result.about;
      })
      .finally(() => this.blur(false));
  }
}
