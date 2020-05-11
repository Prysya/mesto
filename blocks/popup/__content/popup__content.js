const popupEdit = () => `
  <div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">Редактировать профиль</h3>
    <form class="form popup__form" name="edit" novalidate>
      <input
        type="text"
        name="editName"
        class="popup__input popup__input_type_name"
        placeholder="Имя"
        minlength="2"
        maxlength="30"
        required
      />
      <p class="popup__input-error" id="editName"></p>
      <input
        type="text"
        name="editAbout"
        class="popup__input popup__input_type_link-url"
        placeholder="О себе"
        minlength="2"
        maxlength="30"
        required
      />
      <p class="popup__input-error" id="editAbout"></p>
      <button type="submit" class="button popup__button">Сохранить</button>
    </form>
  </div>
`;

const popupPlace = () => `
  <div class="popup__content">
    <img src="./images/close.svg" alt="" class="popup__close" />
    <h3 class="popup__title">Новое место</h3>
    <form class="form popup__form" name="place" novalidate>
      <input
        type="text"
        name="placeName"
        class="popup__input popup__input_type_name"
        placeholder="Название"
        minlength="2"
        maxlength="30"
        required
      />
      <p class="popup__input-error" id="placeName"></p>
      <input
        type="url"
        name="placeLink"
        class="popup__input popup__input_type_link-url"
        placeholder="Ссылка на картинку"
        required
      />
      <p class="popup__input-error" id="placeLink"></p>
      <button type="submit" class="button popup__button" disabled>+</button>
    </form>
  </div>
`;

const popupImage = () => `
<div class="popup__image">
  <img src="./images/close.svg" alt="" class="popup__close popup__close_image" />
</div>
`;
export { popupEdit, popupPlace, popupImage };