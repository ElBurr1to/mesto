const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function deletePlace(evt) {
  let place = evt.target.closest(".places__list-item");
  place.remove();
}

function pushLike(evt) {
  evt.target.classList.toggle("places__like-btn_active");
}

function addPlaceCard(name, link) {
  let placeCard = document.querySelector(".places__list-item-template").content.cloneNode(true);;

  let placeName = placeCard.querySelector(".places__name");
  placeName.textContent = name;
  let placePhoto = placeCard.querySelector(".places__photo");
  placePhoto.src = link;
  placePhoto.alt = name;
  placePhoto.addEventListener("click", openImagePopup);

  let likeButton = placeCard.querySelector(".places__like-btn");
  likeButton.addEventListener("click", pushLike);
  let deleteButton = placeCard.querySelector(".places__delete-btn");
  deleteButton.addEventListener("click", deletePlace);

  let placesList = document.querySelector(".places__list");
  placesList.prepend(placeCard);

}

for (let place of initialCards) {
  addPlaceCard(place.name, place.link);
}

function openPopup() {
  let popupName = popupForm.querySelector(".popup__full-name");
  let popupStatus = popupForm.querySelector(".popup__status");

  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  popup.classList.toggle("popup_opened");
}

function openAddPlaceForm() {
  addPlace.classList.toggle("add-place_opened");
}

function openImagePopup(evt) {
  let imagePopupPhoto = imagePopup.querySelector(".image-popup__photo");
  let imagePopupCaption = imagePopup.querySelector(".image-popup__caption");

  imagePopupPhoto.src = evt.target.src;
  imagePopupPhoto.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.nextElementSibling.children[0].textContent;

  imagePopup.classList.toggle("image-popup_hidden");
}

function closePopup() {
  popup.classList.toggle("popup_opened");
}

function closeAddPlaceForm() {
  addPlace.classList.toggle("add-place_opened");
}

function closeImagePopup() {
  imagePopup.classList.toggle("image-popup_hidden");
}

function editProfile(evt) {
  evt.preventDefault();
  if (evt.submitter === evt.target.querySelector(".popup__close-btn")) {
    closePopup();
    return;
  }

  let popupName = popupForm.querySelector(".popup__full-name");
  let popupStatus = popupForm.querySelector(".popup__status");

  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup();
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  if (evt.submitter === evt.target.querySelector(".add-place__close-btn")) {
    closeAddPlaceForm();
    return;
  }

  let addPlaceFormName = addPlaceForm.querySelector(".add-place__name");
  let addPlaceFormLink = addPlaceForm.querySelector(".add-place__src");

  addPlaceCard(addPlaceFormName.value, addPlaceFormLink.value);
  closeAddPlaceForm();
}

let editButton = document.querySelector(".profile__edit-btn");
let addButton = document.querySelector(".profile__add-btn");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let popup = document.querySelector(".popup");
let popupForm = popup.querySelector(".popup__form");
let addPlace = document.querySelector(".add-place");
let addPlaceForm = addPlace.querySelector(".add-place__form");
let imagePopup = document.querySelector(".image-popup");
let closeButtonImagePopup = imagePopup.querySelector(".image-popup__close-btn");

editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openAddPlaceForm);
popupForm.addEventListener("submit", editProfile);
addPlaceForm.addEventListener("submit", submitAddPlaceForm);
closeButtonImagePopup.addEventListener("click", closeImagePopup);