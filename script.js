let editButton = document.querySelector(".profile__edit-btn");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
let popup = document.querySelector(".popup");
let popupForm = document.querySelector(".popup__form");
let closeButton = document.querySelector(".popup__close-btn");
let submitButton = document.querySelector(".popup__submit-btn");

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

editButton.addEventListener("click", openPopup);
popupForm.addEventListener("close", closePopup);
popupForm.addEventListener("submit", editProfile);
