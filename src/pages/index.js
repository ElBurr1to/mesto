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

const placesList  = new Section(renderPlaceCard, ".places__list");
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
    popupEditAvatar.close();
  })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

function handleSubmitPlaceCard(cardData) {
  popupAddPlace.renderLoading(true);
  api.addPlaceCard(cardData).then(cardInfo => {
    renderPlaceCard(cardInfo);
    popupAddPlace.close();
  })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
    });
}

function popupConfirmSubmit(cardId) {
  api.deletePlaceCard(cardId)
    .then(() => {
      const card = popupConfirm.getCard();
      card.deleteCard();
      popupConfirm.close();
    })
    .catch(err => {
      console.log(err);
    });
}

function handleDeleteCardClick(card) {
  popupConfirm.setCard(card);
  popupConfirm.open();
}

function createCard(cardData) {
  const userId = userInfo.getUserId();
  const card = new Card(cardData, userId, ".card-template", {
    handleCardClick: handlePlaceCardPhotoClick,
    handleCardLikeClick: handleCardLikeClick,
    handleDeleteCardClick: handleDeleteCardClick,
  });
  const cardElement = card.generateCard();
  return cardElement;
}


function handleCardLikeClick(isLiked, cardId) {
  if (isLiked) {
    api.deleteLike(cardId)
      .then(cardInfo => {
        this.setLikes(cardInfo.likes);
        this.updateLikesCount();
      })
      .catch(err => {
        console.log(err);
      })
  }
  else {
    api.addLike(cardId)
      .then(cardInfo => {
        this.setLikes(cardInfo.likes);
        this.updateLikesCount();
      })
      .catch(err => {
        console.log(err);
      })
  }
}

function handleEditProfileClick(evt) {
  popupEditProfileValidator.toggleButtonState();

  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  popupEditProfile.open();
}

function handleEditAvatarClick() {
  popupEditAvatarValidator.toggleButtonState();

  popupEditAvatar.open();
}

function handleSubmitProfile(inputValues) {
  popupEditProfile.renderLoading(true);
  api.setUserInfo(inputValues).then(userData => {
    userInfo.setUserInfo(userData);
    popupEditProfile.close();
  })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });;
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



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.updateAvatar(userData.avatar);
    placesList.renderItems(initialCards);
  })
  .catch(err => {
    console.log(err);
  });

