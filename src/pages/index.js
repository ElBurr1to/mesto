import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { initialCards, params } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage} from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';



const buttonAddPlaceCard = document.querySelector(".profile__add-btn");
const buttonEditProfile = document.querySelector(".profile__edit-btn");

const popupAddPlace = new PopupWithForm(".popup_type_add-place", handleSubmitPlaceCard);
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleSubmitProfile);
const userInfo = new UserInfo({fullNameSelector: ".profile__name", statusSelector: ".profile__status"});
const popupImage = new PopupWithImage(".popup_type_image");
const placesList = new Section({items: initialCards, renderer: renderPlaceCard}, ".places__list");

const popupEditProfileValidator = new FormValidator(params, popupEditProfile.getPopup());
const popupAddPlaceValidator = new FormValidator(params, popupAddPlace.getPopup());

function handleAddPlaceCardClick(evt) {
  popupAddPlaceValidator.toggleButtonState();

  popupAddPlace.open();
}

function handleSubmitPlaceCard(cardData) {
  renderPlaceCard(cardData);
  popupAddPlace.close();
}

function createCard(cardData) {
  const card = new Card(cardData, ".card-template", handlePlaceCardPhotoClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleEditProfileClick(evt) {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  popupEditProfile.open();
}

function handleSubmitProfile(inputValues) {
  userInfo.setUserInfo(inputValues);
  popupEditProfile.close();
}

function handlePlaceCardPhotoClick(link, caption) {
  popupImage.open({imageLink: link, imageCaption: caption});
}

function renderPlaceCard(cardData) {
  const cardElement = createCard(cardData);
  placesList.addItem(cardElement);
}

popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupAddPlace.setEventListeners();
buttonEditProfile.addEventListener("click", handleEditProfileClick);
buttonAddPlaceCard.addEventListener("click", handleAddPlaceCardClick);

placesList.renderItems();

popupEditProfileValidator.enableValidation();
popupAddPlaceValidator.enableValidation();