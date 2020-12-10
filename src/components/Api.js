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
        }).then((res) => {
            return res.json();
        })
    }
    // Добавление карточек с сервера
    addCardsInServer(){
        return fetch(this._url, {
            method: "GET",
            headers: this._headers
        }).then((res) => {
            return res.json();
        })
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
        }).then((res) => {
            return res.json();
        })
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
        }).then((res) => {
            return res.json();
        })
    }
    // Удаление карточки 
    deleteCards(id){
        return fetch(`${this._url}/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then((res) => {
            return res.json();
        })
    }
    // Редактирование аватара
    editAvatar(data){
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then((res) => {
            return res.json();
        })
    }
}