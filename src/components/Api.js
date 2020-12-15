export class Api{
    constructor(data){
        this._url = data.url;
        this._headers = data.headers;
    }

    // Информация о пользователе
    getInfo(){
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers
        }).then(this._checkStatus);
    }
    // Добавление карточек с сервера
    receiveCardsInServer(){
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers
        }).then(this._checkStatus);
    }
    // Добавление карточек из попап
    upCardsToTheServer(names, links){
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: names,
                link: links
            })
        }).then(this._checkStatus);
    }
    // Редактирование информации о пользователе
    editInfoUser(names, links){
        return fetch(`${this._url}/users/me`, {
            method: "PATCH", 
            headers: this._headers,
            body: JSON.stringify({
                name: names,
                about: links
            })
        }).then(this._checkStatus);
    }
    // Удаление карточки 
    deleteCards(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkStatus);
    }
    // Редактирование аватара
    editAvatar(data){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then(this._checkStatus);
    }
    // Постановка лайка
    putLikes(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._checkStatus);
    }
    // Удаление лайка
    deleteLikes(id){
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkStatus);
    }
    // Проверка на ошибки
    _checkStatus(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}