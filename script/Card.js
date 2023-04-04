export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._imagePopup = document.querySelector(".popup_type_image");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__list-item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const placeCardName = this._element.querySelector(".places__name");
    const placeCardPhoto = this._element.querySelector(".places__photo");

    placeCardName.textContent = this._name;
    placeCardPhoto.src = this._link;
    placeCardPhoto.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    const buttonLikePlaceCard = this._element.querySelector(".places__like-btn");
    const buttonDeletePlaceCard = this._element.querySelector(".places__delete-btn");
    const placeCardPhoto = this._element.querySelector(".places__photo");

    placeCardPhoto.addEventListener("click", () => this._handlePlaceCardPhotoClick());
    buttonLikePlaceCard.addEventListener("click", this._handlePlaceCardLikeClick);
    buttonDeletePlaceCard.addEventListener("click", this._handlePlaceCardDeleteClick);
  }

  _handlePlaceCardDeleteClick(evt) {
    evt.target.closest(".places__list-item").remove();
  }

  _handlePlaceCardLikeClick(evt) {
    evt.target.classList.toggle("places__like-btn_active");
  }

  _openImagePopup() {
    this._imagePopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscButton);
  }

  _closeImagePopup() {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscButton);
  }

  _handleEscButton(evt) {
    if (evt.key == "Escape") {
      this._closeImagePopup(this._imagePopup);
    }
  }

  _handlePlaceCardPhotoClick() {
    const popupImagePhoto = this._imagePopup.querySelector(".popup__photo");
    const popupImageCaption = this._imagePopup.querySelector(".popup__caption");
    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._name;
    popupImageCaption.textContent = this._name;


    this._openImagePopup();
  }
}