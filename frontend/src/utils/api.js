class Api {
  constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }  

getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(res => this._checkStatus(res));
  }

updateUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentails,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(res => this._checkStatus(res));
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
  
    }).then(res => this._checkStatus(res));
  }


    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
      }).then(res => this._checkStatus(res));
    }

    postCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then(res => this._checkStatus(res));
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
      }).then(res => this._checkStatus(res));
    }

    likeCard(cardId, isLiked) {
      if (isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
        })
          .then(res => this._checkStatus(res));
      } else {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
        })
          .then(res => this._checkStatus(res));
      }
    }
}

const api = new Api({
  baseUrl: 'https://api.server.students.nomoreparties.co',});

export default api;