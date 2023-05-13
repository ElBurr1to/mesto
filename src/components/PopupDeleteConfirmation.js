import { Popup } from "./Popup.js";

export class PopupDeleteConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setCard(card) {
    this._card = card;
  }

  getCard() {
    return this._card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._card.getId());
    });
  }

}