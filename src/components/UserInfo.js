export class UserInfo {
  constructor({fullNameSelector, statusSelector, avatarSelector}) {
    this._nameElement = document.querySelector(fullNameSelector);
    this._aboutElement = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  setUserInfo({name, about, _id}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._id = _id;
  }

  updateAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }

  getUserId() {
    return this._id;
  }
}