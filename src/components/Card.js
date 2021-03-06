

export class Card {
    constructor({item, handleCardClick, checkLikes, deletedCards}, template, deleteCards, api){
        this._name = item.name;
        this._link = item.link;
        this._idUser = item.owner._id;
        this._likeCards = item.likes.length;
        this._likes = item.likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._deleteCardsPopup = deleteCards;
        this._apiCards = api;
        this._deletedCardApi =  deletedCards;
        this._checkLikes = checkLikes;
        this._editName = document.querySelector('.profile__author').textContent;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._template)
        .content
        .querySelector('.cards__item')
        .cloneNode(true)
        return cardElement;
    }
    checkForId(id){
        if(this._idUser !== id){
            this._buttonDelete.classList.add('cards__delete_inactive');
        }
    }
    // Изменение значения лайков
    _likeCount(likes){
        if(!likes.length){
            this._cardsLike.textContent = "";
        } else {
            this._cardsLike.textContent = likes.length;
        }
    }
    checkCardsLikes(evt) {
        if(evt.target.classList.contains('cards__like_active')){
            return true;
        }
        return false;
    }
    // Активация лайка
    addCardsClass(evt) {
        evt.target.classList.add('cards__like_active');
    }
    //Деактивация лайка
    deleteCardsClass(evt){
        evt.target.classList.remove('cards__like_active');
    }

    // Проверка на мои лайки
    checkMyLikes(id){
        this._likes.some(item => {
            if(id === item._id){
                this._likeButton.classList.add('cards__like_active');
            }
        })
    }
    // Лайк
    _clickLike (evt){
       this._checkLikes(evt);
    }

    // Удаление карточки
    _deleteCards(){
        this._element.remove();
        this._deleteCardsPopup.closeFormDeleteCards();
        this._element = null;
    }
    _deleteCardsFunction(){
        document.querySelector('.popup__delete_button').addEventListener('click', () => {
            this._deletedCardApi();
        })
    }
    // Добавление всех обработчиков карточки
    _setEventListener(){
        this._element.querySelector('.cards__like').addEventListener('click', (evt) =>{
            this._clickLike(evt);
        })
        this._element.querySelector('.cards__delete').addEventListener('click', () =>{
            this._deleteCardsPopup.open();
            this._deleteCardsFunction();
        })
        this._cardValue.addEventListener('click', () =>{
            this._handleCardClick();
        })
    }
        // Cоздание и заполнение карточки
        generateCard(){
            this._element = this._getTemplate();
            this._cardValue = this._element.querySelector('.cards__image');
            this._buttonDelete = this._element.querySelector('.cards__delete');
            this._cardsLike = this._element.querySelector('.cards__like_count');
            this._likeButton = this._element.querySelector('.cards__like');
            this._setEventListener();
    
            this._element.querySelector('.cards__text').textContent = this._name;
            this._cardValue.src = this._link;
            this._cardValue.alt = this._name;
            this._cardsLike.textContent = this._likeCards;
    
            return this._element;
        }
}
