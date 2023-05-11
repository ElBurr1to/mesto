export class UserInfo {
  constructor({fullNameSelector, statusSelector, avatarSelector}) {
    this._nameElement = document.querySelector(fullNameSelector);
    this._aboutElement = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._fullNameElement.textContent,
      about: this._statusElement.textContent
    }
  }

  setUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  updateAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}