class BlurEffect {
  constructor(container) {
    this.container = container;

    this.userPhoto = this.container
      .querySelector(".user-info__photo");
    this.textContainer = this.container
      .querySelector(".user-info__text-container");
  }

  handleBlurEffect = (isLoading) => {
    if (isLoading) {
      this.userPhoto
        .classList.add("user-info__photo_blur");
      this.textContainer
        .classList.add("user-info__text-container_blur");
    } else {
      this.userPhoto
        .classList.remove("user-info__photo_blur");
      this.textContainer
        .classList.remove("user-info__text-container_blur");
    }
  };
}