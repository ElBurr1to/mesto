export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._placeCardName = this._element.querySelector(".card__name");
    this._placeCardPhoto = this._element.querySelector(".card__photo");

    this._placeCardName.textContent = this._name;
    this._placeCardPhoto.src = this._link;
    this._placeCardPhoto.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._buttonLikePlaceCard = this._element.querySelector(".card__like-btn");
    this._buttonDeletePlaceCard = this._element.querySelector(".card__delete-btn");

    this._placeCardPhoto.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    this._buttonLikePlaceCard.addEventListener("click", () => this._handlePlaceCardLikeClick());
    this._buttonDeletePlaceCard.addEventListener("click", () => this._handlePlaceCardDeleteClick());
  }

  _handlePlaceCardDeleteClick(evt) {
    this._element.remove();
    delete this._element;
  }

  _handlePlaceCardLikeClick(evt) {
    this._buttonLikePlaceCard.classList.toggle("card__like-btn_active");
  }
}