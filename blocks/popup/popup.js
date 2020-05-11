import {
  popupPlace,
  popupEdit,
  popupImage,
} from "./__content/popup__content.js";

const popupFunctions = () => {
  const popup = document.querySelector(".popup");

  const popupOpen = () => popup.classList.add("popup_is-opened");

  const popupClose = () => popup.classList.remove("popup_is-opened");

  const popupCreatePlace = () =>
    popup.insertAdjacentHTML("afterbegin", popupPlace());

  const popupCreateEdit = () =>
    popup.insertAdjacentHTML("afterbegin", popupEdit());

  const popupCreateImage = () =>
    popup.insertAdjacentHTML("afterbegin", popupImage());

  const popupCloseEsc = (event) => {
    if (event.key === "Escape") {
      popup.innerHTML = "";
      return popupClose();
    }
    return false;
  };

  return {
    popupOpen,
    popupClose,
    popupCreatePlace,
    popupCreateEdit,
    popupCloseEsc,
    popupCreateImage
  };
};

export default popupFunctions;
