export default class Spinner {
  constructor(container) {
    this.container = container;
  }

  handleSpinner = (isLoading) => {
    if (isLoading) {
      this.container.classList.add("spinner_visible");
    } else {
      this.container.classList.remove("spinner_visible");
    }
  };


}
