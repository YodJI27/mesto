export class Api{
    constructor(data){
        this._url = data.url;
        this._headers = data.headers;
    }

    // Информация о пользователе
    getInfo(){
        return fetch(this._url, {
            method: "GET",
            headers: this._headers
        }).then(this._checkError);
    }
    // Добавление карточек с сервера
    addCardsInServer(){
        return fetch(this._url, {
            method: "GET",
            headers: this._headers
        }).then(this._checkError);
    }
    // Добавление карточек из попап
    getAddCards(names, links){
        return fetch(this._url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: names,
                link: links
            })
        }).then(this._checkError);
    }
    // Редактирование информации о пользователе
    getEditInfo(names, links){
        return fetch(this._url, {
            method: "PATCH", 
            headers: this._headers,
            body: JSON.stringify({
                name: names,
                about: links
            })
        }).then(this._checkError);
    }
    // Удаление карточки 
    deleteCards(id){
        return fetch(`${this._url}/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkError);
    }
    // Редактирование аватара
    editAvatar(data){
        return fetch(`${this._url}/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then(this._checkError);
    }
    // Постановка лайка
    putLikes(id){
        return fetch(`${this._url}/likes/${id}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._checkError);
    }
    // Удаление лайка
    deleteLikes(id){
        return fetch(`${this._url}/likes/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkError);
    }
    // Проверка на ошибки
    _checkError(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}