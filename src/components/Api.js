export class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при получениии информации о пользователе: ${res.status}`);
      })
      .then(user => {
        this._userId = user._id;
        return {
          name: user.name,
          about: user.about,
          avatar: user.avatar
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при получениии начальных карточек: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
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
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при получениии информации о пользователе: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
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
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при добавлении лайка: ${res.status}`);
      })
      .then(cardInfo => {
        cardInfo.userId = this._userId;
        return cardInfo;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при удалении лайка: ${res.status}`);
      })
      .then(cardInfo => {
        cardInfo.userId = this._userId;
        return cardInfo;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deletePlaceCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
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
        if (res.ok) return res.json();
        else return Promise.reject(`Ошибка при обновлении аватара: ${res.status}`);
      })
      .catch(err => {
        console.log(err);
      });
  }
}