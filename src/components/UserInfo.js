export class UserInfo {
  constructor({fullNameSelector, statusSelector}) {
    this._fullNameElement = document.querySelector(fullNameSelector);
    this._statusElement = document.querySelector(statusSelector);
  }

  getUserInfo() {
    return {
      fullName: this._fullNameElement.textContent,
      status: this._statusElement.textContent
    }
  }

  setUserInfo({fullName, status}) {
    this._fullNameElement.textContent = fullName;
    this._statusElement.textContent = status;
  }
}