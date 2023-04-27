import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputElements = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputElements.forEach(input => this._inputValues[input.name] = input.value);

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputElements.forEach(input => input.value = data[input.name] || "");
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
