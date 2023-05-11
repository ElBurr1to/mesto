export class Card {
  constructor(data, templateSelector, handlers) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._apiAddLike = handlers.apiAddLike;
    this._apiDeleteLike = handlers.apiDeleteLike;
    this._handleDeleteCardClick = handlers.handleDeleteCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _updateLikesCount(userId) {
    this._placeCardLikeCounter.textContent = this._likes.length;
    const usersId = this._likes.map(elem => elem._id);
    if (usersId.includes(userId)) this._buttonLikePlaceCard.classList.add("card__like-btn_active");
    else this._buttonLikePlaceCard.classList.remove("card__like-btn_active");
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._placeCardName = this._element.querySelector(".card__name");
    this._placeCardPhoto = this._element.querySelector(".card__photo");
    this._placeCardLikeCounter = this._element.querySelector(".card__like-counter");
    this._buttonLikePlaceCard = this._element.querySelector(".card__like-btn");
    this._buttonDeletePlaceCard = this._element.querySelector(".card__delete-btn");
    if (this._owner._id === userId) this._buttonDeletePlaceCard.classList.add("card__delete-btn_visible");

    this._placeCardName.textContent = this._name;
    this._placeCardPhoto.src = this._link;
    this._placeCardPhoto.alt = this._name;
    this._updateLikesCount(userId);

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._placeCardPhoto.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    this._buttonLikePlaceCard.addEventListener("click", () => this._handlePlaceCardLikeClick());
    this._buttonDeletePlaceCard.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });
  }

  deleteCard() {
    this._element.remove();
    delete this._element;
  }

  _handlePlaceCardLikeClick() {
    let likeResponse;
    if (this._buttonLikePlaceCard.classList.contains("card__like-btn_active")) likeResponse = this._apiDeleteLike(this._id);
    else likeResponse = this._apiAddLike(this._id);

    likeResponse.then(cardInfo => {
      this._likes = cardInfo.likes;
      this._updateLikesCount(cardInfo.userId);
    });
  }

}