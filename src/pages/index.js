import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js"
import { params } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage} from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDeleteConfirmation } from "../components/PopupDeleteConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'f46d348f-082d-46de-8877-1ce888e8ef70',
    'Content-Type': 'application/json'
  }
});

const buttonAddPlaceCard = document.querySelector(".profile__add-btn");
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonEditAvatar = document.querySelector(".profile__avatar");

const popupAddPlace = new PopupWithForm(".popup_type_add-place", handleSubmitPlaceCard);
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleSubmitProfile);
const popupEditAvatar = new PopupWithForm(".popup_type_avatar", handleSubmitAvatar);
const popupConfirm = new PopupDeleteConfirmation(".popup_type_confirm", popupConfirmSubmit);

const userInfo = new UserInfo({
  fullNameSelector: ".profile__name",
  statusSelector: ".profile__status",
  avatarSelector: ".profile__avatar-img"
});
const popupImage = new PopupWithImage(".popup_type_image");
const popupEditProfileValidator = new FormValidator(params, popupEditProfile.getPopup());
const popupAddPlaceValidator = new FormValidator(params, popupAddPlace.getPopup());
const popupEditAvatarValidator = new FormValidator(params, popupEditAvatar.getPopup());

function handleAddPlaceCardClick(evt) {
  popupAddPlaceValidator.toggleButtonState();

  popupAddPlace.open();
}

function handleSubmitAvatar(inputValues) {
  popupEditAvatar.renderLoading(true);
  api.updateAvatar(inputValues.avatar).then(() => {
    userInfo.updateAvatar(inputValues.avatar);
    popupEditAvatar.renderLoading(false);
    popupEditAvatar.close();
  })
}

function handleSubmitPlaceCard(cardData) {
  popupAddPlace.renderLoading(true);
  api.addPlaceCard(cardData).then(cardInfo => {
    renderPlaceCard(cardInfo);
    popupAddPlace.renderLoading(false);
    popupAddPlace.close();
  })
}

function popupConfirmSubmit(cardId) {
  api.deletePlaceCard(cardId);
  popupConfirm.close();
}

function handleDeleteCardClick(card) {
  popupConfirm.getCard(card);
  popupConfirm.open();
}

function createCard(cardData) {
  const card = new Card(cardData, ".card-template", {
    handleCardClick: handlePlaceCardPhotoClick,
    apiAddLike: api.addLike.bind(api),
    apiDeleteLike: api.deleteLike.bind(api),
    handleDeleteCardClick: handleDeleteCardClick,
  });
  const cardElement = card.generateCard(api._userId);
  return cardElement;
}

function handleEditProfileClick(evt) {
  api.getUserInfo().then(userData =>{
    popupEditProfile.setInputValues(userData);
    popupEditProfile.open();
  });
}

function handleEditAvatarClick() {
  popupEditAvatar.open();
}

function handleSubmitProfile(inputValues) {
  popupEditProfile.renderLoading(true);
  api.setUserInfo(inputValues).then(userData => {
    userInfo.setUserInfo(userData);
    popupEditProfile.renderLoading(false);
    popupEditProfile.close();
  });
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
popupEditAvatar.setEventListeners();
popupConfirm.setEventListeners();
buttonEditProfile.addEventListener("click", handleEditProfileClick);
buttonAddPlaceCard.addEventListener("click", handleAddPlaceCardClick);
buttonEditAvatar.addEventListener("click", handleEditAvatarClick);

popupEditProfileValidator.enableValidation();
popupAddPlaceValidator.enableValidation();
popupEditAvatarValidator.enableValidation();




//загрузка профиля
api.getUserInfo().then(userData => {
  userInfo.setUserInfo(userData);
  userInfo.updateAvatar(userData.avatar);
});

//загрузка карточек
let placesList;
api.getInitialCards().then(initialCards => {
  placesList = new Section({items: initialCards, renderer: renderPlaceCard}, ".places__list");
  placesList.renderItems();
});

