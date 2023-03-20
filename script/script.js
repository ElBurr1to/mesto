const popupList = document.querySelectorAll(".popup");

const placeCardTemplate = document.querySelector(".places__list-item-template").content;
const placesContainer = document.querySelector(".places__list");
const popupAddPlace = document.querySelector(".popup_type_add-place");
const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");
const buttonAddPlaceCard = document.querySelector(".profile__add-btn");
const buttomSubmitPlaceCard = popupAddPlace.querySelector(".popup__submit-btn_type_add-place");
const popupAddPlaceName = popupAddPlace.querySelector(".popup__input_type_place-name");
const popupAddPlaceLink = popupAddPlace.querySelector(".popup__input_type_src");

const buttonEditProfile = document.querySelector(".profile__edit-btn");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileFullName = popupEditProfile.querySelector(".popup__input_type_full-name");
const popupEditProfileStatus = popupEditProfile.querySelector(".popup__input_type_status");
const profileFullName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = popupImage.querySelector(".popup__photo");
const popupImageCaption = popupImage.querySelector(".popup__caption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscButton);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscButton);
}

function handleAddPlaceCardClick(evt) {
  toggleButtonState([popupAddPlaceName, popupAddPlaceLink], buttomSubmitPlaceCard, 'popup__submit-btn_disabled');
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

function handleSubmitPlaceCard(evt) {
  evt.preventDefault();
  const placename = popupAddPlaceName.value;
  const placeLink = popupAddPlaceLink.value;

  renderPlaceCard({name: placename, link: placeLink});
  evt.target.reset()
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

for (let cardData of initialCards) {
  renderPlaceCard(cardData);
}

buttonEditProfile.addEventListener("click", handleEditProfileClick);
popupEditProfileForm.addEventListener("submit", handleSubmitProfile)
buttonAddPlaceCard.addEventListener("click", handleAddPlaceCardClick);
popupAddPlaceForm.addEventListener("submit", handleSubmitPlaceCard);
popupList.forEach(popup => {
  popup.addEventListener("mousedown", evt =>  {
    if (evt.target.classList.contains("popup_opened")) closePopup(popup);
    if (evt.target.classList.contains("popup__close-btn")) closePopup(popup);
  });
});