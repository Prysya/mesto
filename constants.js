const popupEditOptions = {
  popupTitle: "Редактировать профиль",
  formName: "edit",
  inputFirstType: "text",
  inputFirstName: "editName",
  inputFirstPlaceholder: "Имя",
  inputFirstMinlength: "2",
  inputFirstMaxlength: "30",
  inputSecondType: "text",
  inputSecondName: "editAbout",
  inputSecondPlaceholder: "О себе",
  inputSecondMinlength: "2",
  inputSecondMaxlength: "30",
  buttonValue: "Сохранить",
};

const popupPlaceOptions = {
  popupTitle: "Новое место",
  formName: "place",
  inputFirstType: "text",
  inputFirstName: "placeName",
  inputFirstPlaceholder: "Название",
  inputFirstMinlength: "2",
  inputFirstMaxlength: "30",
  inputSecondType: "url",
  inputSecondName: "placeLink",
  inputSecondPlaceholder: "Ссылка на картинку",
  inputSecondMinlength: "2",
  inputSecondMaxlength: "10000",
  buttonValue: "+",
}

export {popupEditOptions, popupPlaceOptions};