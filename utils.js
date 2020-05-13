const like = (event) => {
  if (event.target.classList.contains("place-card__like-icon")) {
    return event.target.classList.toggle("place-card__like-icon_liked");
  }
  return false;
};

const deleteImage = (event) => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    return event.currentTarget.removeChild(event.target.parentNode.parentNode);
  }
  return false;
};

const addImageStyle = (event) => {
  const popupImage = document.querySelector(".popup__image");

  popupImage.style = event.target.attributes.style.value;
};

export {like, deleteImage, addImageStyle};