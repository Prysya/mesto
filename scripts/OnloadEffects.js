class OnloadEffects {
  constructor(container) {
    this.container = container;
  }

  spinner = (isLoading) => {
    if (isLoading) {
      this.container.classList.add("spinner_visible");
    } else {
      this.container.classList.remove("spinner_visible");
    }
  }

  blur = (isLoading) => {
    if (isLoading) {
      this.container
        .querySelector(".user-info__photo")
        .classList.add("user-info__photo_blur");
      this.container
        .querySelector(".user-info__text-container")
        .classList.add("user-info__text-container_blur");
    } else {
      this.container
        .querySelector(".user-info__photo")
        .classList.remove("user-info__photo_blur");
      this.container
        .querySelector(".user-info__text-container")
        .classList.remove("user-info__text-container_blur");
    }
  }
}
