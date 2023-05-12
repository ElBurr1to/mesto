export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res, errorMessage) {
    if (!res.ok) {
      return Promise.reject(errorMessage + res.status);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при получениии информации о пользователе: ");
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при получениии начальных карточек: ");
      });
  }

  setUserInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при получениии информации о пользователе: ");
      });
  }

  addPlaceCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при добавлении карточки: ");
      });
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при добавлении лайка: ");
      });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при удалении лайка: ");
      });

  }

  deletePlaceCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при удалении карточки: ");
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        return this._getResponseData(res, "Ошибка при обновлении аватара: ");
      });
  }
}