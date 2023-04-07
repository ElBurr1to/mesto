import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js"
import { initialCards } from "./cards.js";

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

const popupList = document.querySelectorAll(".popup");

const placesContainer = document.querySelector(".places__list");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");
const buttonAddPlaceCard = document.querySelector(".profile__add-btn");
const popupAddPlaceName = popupAddPlace.querySelector(".popup__input_type_place-name");
const popupAddPlaceLink = popupAddPlace.querySelector(".popup__input_type_src");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileFullName = popupEditProfile.querySelector(".popup__input_type_full-name");
const popupEditProfileStatus = popupEditProfile.querySelector(".popup__input_type_status");
const profileFullName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const imagePopup = document.querySelector(".popup_type_image");
const popupImagePhoto = imagePopup.querySelector(".popup__photo");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscButton);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscButton);
}

function handleAddPlaceCardClick(evt) {
  const popupAddPlaceValidator = new FormValidator(params, popupAddPlace);
  popupAddPlaceValidator.toggleButtonState();

  openPopup(popupAddPlace);
}

function handleSubmitPlaceCard(evt) {
  evt.preventDefault();
  const placename = popupAddPlaceName.value;
  const placeLink = popupAddPlaceLink.value;

  const cardElement = createPlaceCard({name: placename, link: placeLink});
  renderPlaceCard(cardElement);
  evt.target.reset()
  closePopup(popupAddPlace);
}

function handleEditProfileClick(evt) {
  const popup = renderPopupEditProfile();
  openPopup(popup);
}

function renderPopupEditProfile() {
  popupEditProfileFullName.value = profileFullName.textContent;
  popupEditProfileStatus.value = profileStatus.textContent;

  return popupEditProfile;
}

function handleSubmitProfile(evt) {
  evt.preventDefault();

  profileFullName.textContent = popupEditProfileFullName.value;
  profileStatus.textContent = popupEditProfileStatus.value;

  closePopup(popupEditProfile);
}

function handleEscButton(evt) {
  if (evt.key == "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function handlePlaceCardPhotoClick(link, name) {

  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageCaption.textContent = name;

  openPopup(imagePopup);
}

function createPlaceCard(cardData) {
  const card = new Card(cardData, ".card-template", handlePlaceCardPhotoClick);
  return card.generateCard();
}

function renderPlaceCard(cardElement) {
  placesContainer.prepend(cardElement);
}

for (let cardData of initialCards) {
  const cardElement = createPlaceCard(cardData);
  renderPlaceCard(cardElement);
}

buttonEditProfile.addEventListener("click", handleEditProfileClick);
popupEditProfileForm.addEventListener("submit", handleSubmitProfile)
buttonAddPlaceCard.addEventListener("click", handleAddPlaceCardClick);
popupAddPlaceForm.addEventListener("submit", handleSubmitPlaceCard);
popupList.forEach(popup => {
  popup.addEventListener("mousedown", evt =>  {
    if (evt.target.classList.contains("popup_opened")
        || evt.target.classList.contains("popup__close-btn")) {
      closePopup(popup);
    }
  });
});

const popupEditProfileValidator = new FormValidator(params, popupEditProfile);
popupEditProfileValidator.enableValidation();
const popupAddPlaceValidator = new FormValidator(params, popupAddPlace);
popupAddPlaceValidator.enableValidation();