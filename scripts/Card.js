import {openedPopup, photoCards, photoImage, textImage} from './index.js';

export class Card {
    constructor(data, template){
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._template)
        .content
        .querySelector('.cards__item')
        .cloneNode(true)
        return cardElement;
    }
    // Cоздание и заполнение карточки
    generateCard(){
        this._element = this._getTemplate();
        this._setEventListener();

        this._element.querySelector('.cards__text').textContent = this._name;
        const cardValue = this._element.querySelector('.cards__image');

        cardValue.src = this._link;
        cardValue.alt = this._name;

        return this._element;
    }
    // Лайк
    _clickLike (){
        this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
    }   
    // Удаление карточки
    _deleteCards(){
        this._element.remove();
    }
    // Приближение изображения
    _openCards(){
        openedPopup(photoCards, 'popup_opened');
        const cardsImage = this._element.querySelector('.cards__image');
        photoImage.src = cardsImage.src;
        textImage.textContent = cardsImage.alt;
    }
    // Добавление всех обработчиков карточки
    _setEventListener(){
        this._element.querySelector('.cards__like').addEventListener('click', () =>{
            this._clickLike();
        })
        this._element.querySelector('.cards__delete').addEventListener('click', () =>{
            this._deleteCards();
        })
        this._element.querySelector('.cards__image').addEventListener('click', () =>{
            this._openCards();
        })
    }
}
