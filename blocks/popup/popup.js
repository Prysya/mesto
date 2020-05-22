const popupFunctions = () => {
  const popup = document.querySelector(".popup");
  let handlers = [];

  const setEventListener = (element, event, handler) => {
    element.addEventListener(event, handler);
    handlers.push({ element, event, handler });
  };

  const removeEventListeners = () => {
    handlers.forEach((item) => {
      const { element, event, handler } = item;

      element.removeEventListener(event, handler);
    });
    handlers = [];
  };

  const popupOpen = () => popup.classList.add("popup_is-opened");

  const popupClose = () => {
    popup.classList.remove("popup_is-opened");
    popup.innerHTML = "";
  };

  const popupCreate = (block) => popup.insertAdjacentHTML("afterbegin", block);

  const popupCloseEsc = (event) => {
    if (event.key === "Escape") {
      removeEventListeners();
      return popupClose();
    }
    return false;
  };

  const closeButton = (event) => {
    if (event.target.classList.contains("popup__close")) {
      removeEventListeners();
      popupClose();
    }
  };

  const setCloseButtonEvent = () =>
    setEventListener(popup, "click", closeButton);

  return {
    popupOpen,
    popupClose,
    popupCloseEsc,
    setEventListener,
    removeEventListeners,
    popupCreate,
    setCloseButtonEvent,
  };
};

export default popupFunctions;
