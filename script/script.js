let editButton = document.querySelector(".profile__edit-btn");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__form");
let closeButton = document.querySelector(".popup__close-btn");
let submitButton = document.querySelector(".popup__submit-btn");
let deleteButtons = document.querySelectorAll(".places__delete-btn");
let likeButtons = document.querySelectorAll(".places__like-btn");

function openPopup() {
  let popupName = popupForm.querySelector(".popup__full-name");
  let popupStatus = popupForm.querySelector(".popup__status");

  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  popup.classList.toggle("popup_opened");
}

function closePopup() {
  popup.classList.toggle("popup_opened");
}

function editProfile(evt) {
  evt.preventDefault();
  let popupName = popupForm.querySelector(".popup__full-name");
  let popupStatus = popupForm.querySelector(".popup__status");

  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup();
}

function deletePlace(evt) {
  let place = evt.target.closest(".places__list-item");
  place.remove();
}

function pushLike(evt) {
  evt.target.classList.toggle("places__like-btn_active");
}

editButton.addEventListener("click", openPopup);
popupForm.addEventListener("close", closePopup);
popupForm.addEventListener("submit", editProfile);

for (let button of deleteButtons) {
  button.addEventListener("click", deletePlace);
}

for (let like of likeButtons) {
  like.addEventListener("click", pushLike);
}