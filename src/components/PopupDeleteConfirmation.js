import { Popup } from "./Popup.js";

export class PopupDeleteConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  getCard(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._card._id);
      this._card.deleteCard();
    });
  }

}