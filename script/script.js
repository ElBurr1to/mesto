const placeCardTemplate = document.querySelector(".places__list-item-template").content;
const placesContainer = document.querySelector(".places__list");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const buttonAddPlaceCard = document.querySelector(".profile__add-btn");
const buttomSubmitPlaceCard = document.querySelector(".popup__submit-btn_type_add-place");
const popupAddPlaceName = popupAddPlace.querySelector(".popup__input_type_place-name");
const popupAddPlaceLink = popupAddPlace.querySelector(".popup__input_type_src");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonSubmitProfile = document.querySelector(".popup__submit-btn_type_edit-profile");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileFullName = document.querySelector(".popup__input_type_full-name");
const popupEditProfileStatus = document.querySelector(".popup__input_type_status");
const profileFullName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = document.querySelector(".popup__photo");
const popupImageCaption = document.querySelector(".popup__caption");

const buttonClosePopupList = document.querySelectorAll(".popup__close-btn");

function openPopup(popup) {
  popup.classList.toggle("popup_opened");
}

function closePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function handleAddPlaceCardClick(evt) {
  openPopup(popupAddPlace);
}

function createPlaceCard(cardData) {
  const placeCard = placeCardTemplate.cloneNode(true);
  const placeCardName = placeCard.querySelector(".places__name");
  const placeCardPhoto = placeCard.querySelector(".places__photo");
  const buttonLikePlaceCard = placeCard.querySelector(".places__like-btn");
  const buttonDeletePlaceCard = placeCard.querySelector(".places__delete-btn");

  placeCardName.textContent = cardData.name;
  placeCardPhoto.src = cardData.link;
  placeCardPhoto.alt = cardData.name;

  placeCardPhoto.addEventListener("click", handlePlaceCardPhotoClick);
  buttonLikePlaceCard.addEventListener("click", handlePlaceCardLikeClick);
  buttonDeletePlaceCard.addEventListener("click", handlePlaceCardDeleteClick);

  return placeCard;
}

function renderPlaceCard(cardData) {
  const placeCard = createPlaceCard(cardData);
  placesContainer.prepend(placeCard);
}

function handleSubmitPlaceCardClick(evt) {
  evt.preventDefault();
  const placename = popupAddPlaceName.value;
  const placeLink = popupAddPlaceLink.value;

  renderPlaceCard({name: placename, link: placeLink});
  closePopup(popupAddPlace);
}

function handlePlaceCardDeleteClick(evt) {
  const placeCard = evt.target.closest(".places__list-item");
  placeCard.remove();
}

function handlePlaceCardLikeClick(evt) {
  evt.target.classList.toggle("places__like-btn_active");
}

function handlePlaceCardPhotoClick(evt) {
  const imageData = {};
  imageData.src = evt.target.src;
  imageData.alt = evt.target.alt;
  imageData.caption = evt.target.nextElementSibling.children[0].textContent;

  renderPopupImage(imageData);
  openPopup(popupImage);
}

function renderPopupImage(imageData) {
  popupImagePhoto.src = imageData.src;
  popupImagePhoto.alt = imageData.alt;
  popupImageCaption.textContent = imageData.caption;

  return popupImage;
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

function handleSubmitProfileClick(evt) {
  evt.preventDefault();

  profileFullName.textContent = popupEditProfileFullName.value;
  profileStatus.textContent = popupEditProfileStatus.value;

  closePopup(popupEditProfile);
}

function handleClosePopupClick(evt) {
  evt.preventDefault();
  const popup = evt.target.closest(".popup");

  closePopup(popup);
}

for (let cardData of initialCards) {
  renderPlaceCard(cardData);
}

buttonEditProfile.addEventListener("click", handleEditProfileClick);
buttonSubmitProfile.addEventListener("click", handleSubmitProfileClick)
buttonAddPlaceCard.addEventListener("click", handleAddPlaceCardClick);
buttomSubmitPlaceCard.addEventListener("click", handleSubmitPlaceCardClick);
for (let buttonClosePopup of buttonClosePopupList) {
  buttonClosePopup.addEventListener("click", handleClosePopupClick);
}