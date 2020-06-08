class UserInfo {
  constructor(userName, userJob, avatar, api, blur, owner) {
    this.userName = userName;
    this.userJob = userJob;
    this.avatar = avatar;
    this.api = api;
    this.blur = blur;
    this.owner = owner
  }

  getUserInfo() {
    this.api("users/me")
      .then((result) => {
        this.avatar.style.backgroundImage = `url(${result.avatar})`;
        this.userName.textContent = result.name;
        this.userJob.textContent = result.about;
        this.owner.ownerId = result._id;
      })
      .then(() => this.blur(false))
      .catch(err => console.log(err))

  }
}
