const popupTemplate = (options) => {
  const {
    popupTitle,
    formName,
    inputFirstType,
    inputFirstName,
    inputFirstPlaceholder,
    inputFirstMinlength,
    inputFirstMaxlength,
    inputSecondType,
    inputSecondName,
    inputSecondPlaceholder,
    inputSecondMinlength,
    inputSecondMaxlength,
    buttonValue,
  } = options;

  return `<div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">${popupTitle}</h3>
    <form class="form popup__form" name="${formName}" novalidate>
      <input
        type="${inputFirstType}"
        name="${inputFirstName}"
        class="popup__input popup__input_type_name"
        placeholder="${inputFirstPlaceholder}"
        minlength=${inputFirstMinlength}
        maxlength=${inputFirstMaxlength}
        required
      />
      <p class="popup__input-error" id="${inputFirstName}"></p>
      <input
        type="${inputSecondType}"
        name="${inputSecondName}"
        class="popup__input popup__input_type_link-url"
        placeholder="${inputSecondPlaceholder}"
        minlength=${inputSecondMinlength}
        maxlength=${inputSecondMaxlength}
        required
      />
      <p class="popup__input-error" id="${inputSecondName}"></p>
      <button type="submit" name="submit" class="button popup__button">
        ${buttonValue}
      </button>
    </form>
  </div>`;
};

const popupImage = () => `
<div class="popup__image">
  <img src="./images/close.svg" alt="" class="popup__close popup__close_image" />
</div>
`;

export {popupTemplate, popupImage};

/*
  Можно лучше:
  - Попапы практически одинаковые. Нужно их совместить
*/
