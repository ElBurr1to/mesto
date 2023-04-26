import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__photo");
    this._popupCaption = this._popup.querySelector(".popup__caption");
  }

  open({imageLink, imageCaption}) {
    this._popupImage.src = imageLink;
    this._popupImage.alt = imageCaption;
    this._popupCaption.textContent = imageCaption;
    super.open();
  }
}