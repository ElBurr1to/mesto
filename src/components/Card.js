export class Card {
  constructor(data, templateSelector, handlers) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleLikeClick = handlers.handleCardLikeClick;
    this._handleDeleteCardClick = handlers.handleDeleteCardClick;
    this._isLiked = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  setLikes(likes) {
    this._likes = likes;
  }

  updateLikesCount() {
    this._placeCardLikeCounter.textContent = this._likes.length;
    const usersId = this._likes.map(elem => elem._id);
    if (usersId.includes(this._userId)) {
      this._buttonLikePlaceCard.classList.add("card__like-btn_active");
      this._isLiked = true;
    }
    else
    {
      this._buttonLikePlaceCard.classList.remove("card__like-btn_active");
      this._isLiked = false;
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._placeCardName = this._element.querySelector(".card__name");
    this._placeCardPhoto = this._element.querySelector(".card__photo");
    this._placeCardLikeCounter = this._element.querySelector(".card__like-counter");
    this._buttonLikePlaceCard = this._element.querySelector(".card__like-btn");
    this._buttonDeletePlaceCard = this._element.querySelector(".card__delete-btn");
    if (this._owner._id === this._userId) this._buttonDeletePlaceCard.classList.add("card__delete-btn_visible");
    this._placeCardName.textContent = this._name;
    this._placeCardPhoto.src = this._link;
    this._placeCardPhoto.alt = this._name;
    this.updateLikesCount();

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._placeCardPhoto.addEventListener("click", () => this._handleCardClick(this._link, this._name));
    this._buttonLikePlaceCard.addEventListener("click", () => this._handleLikeClick(this._isLiked, this._id));
    this._buttonDeletePlaceCard.addEventListener("click", () => this._handleDeleteCardClick(this));
  }

  deleteCard() {
    this._element.remove();
    delete this._element;
  }

}