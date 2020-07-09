import Popup from "./Popup.js";

export default class PopupImage extends Popup {
  open(url) {
    this.container.querySelector(".popup__image").setAttribute(`src`, url);

    super.open();
  }
}
