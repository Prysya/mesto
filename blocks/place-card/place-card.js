const createCardBlock = (data) => `<div class="place-card">
                  <div class="place-card__image" style="background-image: url(${data.placeLink})">
                    <button class="place-card__delete-icon"></button>
                  </div>
                  <div class="place-card__description">
                    <h3 class="place-card__name">${data.placeName}</h3>
                    <button class="place-card__like-icon"></button>
                  </div>
                </div>
`;

export default createCardBlock;